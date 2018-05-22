import React from 'react'
import ApiManager from './ApiManager'
import Moment from 'react-moment'
import 'moment-timezone'
import 'moment/locale/fr'

class Feed extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      posts: [],
      statusValue: '',
      buttonPublishDisabled: false,
    }
  }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts() {
    return ApiManager.getPosts()
      .then(posts => {
        this.setState({
          posts: posts,
          loading: false,
        })
        return posts
      })
      .catch(error => console.error(error))
  }

  handleStatusChange = (event) => {
    this.setState({ statusValue: event.target.value })
  }

  handleStatusSubmit = (event) => {
    event.preventDefault()
    this.setState({
      buttonPublishDisabled: true,
    })
    ApiManager.post(this.state.statusValue).then(() => {
      this.setState({
        statusValue: '',
        buttonPublishDisabled: false,
      })
      this.fetchPosts()
    })
  }

  render() {
    if (this.state.loading) {
      return (<p>Chargement…</p>)
    }

    return (
      <div className="container">
        <h3>Fil d'actualité</h3>
        <form className="m-2" onSubmit={this.handleStatusSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Publier sur mon mur</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.statusValue}
              onChange={this.handleStatusChange} />
          </div>
          <input className="btn btn-primary" type="submit" value="Publier" />
        </form>
        {this.state.posts.map((post, i) => <FeedItem key={i} post={post} />)}
      </div>
    )
  }
}

class FeedItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.post._id,
      likes: this.props.post.likes,
      comments: [],
      buttonCommentsDisabled: this.props.post.comments.length === 0,
      buttonLikeDisabled: false,
      buttonSendDisabled: true,
      iLiked: false,
    }
  }

  componentDidMount() {
    this.fetchComments()
    ApiManager.getUser().then(user => {
      if (this.state.likes.includes(user._id)) {
        this.setState({
          iLiked: true
        })
      }
    })
    this.refreshLikes()
  }

  refreshLikes() {
    ApiManager.getPost(this.state.id).then(post => {
      this.setState({
        likes: post.likes
      })
    })
  }

  fetchComments = () => {
    this.setState({
      buttonCommentsDisabled: true,
    })
    ApiManager.getComments(this.props.post._id).then(comments => {
      this.setState({
        comments: comments,
      })
    }).catch(() => this.setState({
      buttonCommentsDisabled: false,
    }))
  }

  like = () => {
    this.setState({
      buttonLikeDisabled: true,
    })
    ApiManager.likePost(this.props.post._id).then(() => {
      this.setState(previousState => {
        return {
          buttonLikeDisabled: false,
          iLiked: !previousState.iLiked,
        }
      })
      this.refreshLikes()
    }).catch(() => this.setState({
      buttonLikeDisabled: false,
    }))
  }

  handleCommentChange = (event) => {
    this.setState({ commentValue: event.target.value })
  }

  handleCommentSubmit = (event) => {
    event.preventDefault()
    this.setState({
      buttonSendDisabled: true,
    })
    ApiManager.post(this.state.commentValue, this.state.id).then(() => {
      this.setState({
        statusValue: '',
        buttonSendDisabled: false,
        commentValue: '',
      })
      this.fetchComments()
    })
  }

  render() {
    return (
      <div className="card m-2" id={this.props.post._id} style={{ marginBottom: '2rem' }}>
        <div className="card-body">
          <p className="card-text">{this.props.post.content}</p>
          <p className="card-text text-muted text-right">Publié
            par {this.props.post.author.firstName} {this.props.post.author.lastName} <Moment locale="fr"
              date={this.props.post.createdAt} fromNow /></p>
          <p className="card-text text-muted">{this.state.likes.length > 0
            ? this.state.likes.length > 1
              ? this.state.likes.length + ' personnes aiment cette publication'
              : '1 personne aime cette publication'
            : 'Personne n\'a aimé cette publication'}</p>
          <button className="btn btn-primary mr-2" onClick={this.like}
            disabled={this.state.buttonLikeDisabled}>{this.state.iLiked ? '👎 Je n\'aime plus' : '👍 J\'aime'}</button>
          <div className="comments">{this.state.comments.map((comment, i) => {
            return (
              <div className="bg-light m-2 p-2" key={i}>
                <img className="rounded-circle" src={comment.author.profilePic} alt="Photo de profil"
                  style={{ maxWidth: '5rem' }} />
                <p>{comment.content}</p>
                <p className="text-muted">Publié par {comment.author.firstName} {comment.author.lastName} <Moment
                  locale="fr"
                  date={comment.createdAt} fromNow /></p>
              </div>
            )
          })}</div>
          <form className="m-2" onSubmit={this.handleCommentSubmit}>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Écrire un commentaire</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"
                value={this.state.commentValue}
                onChange={this.handleCommentChange} />
            </div>
            <input className="btn btn-primary" type="submit" value="Envoyer" />
          </form>
        </div>
      </div>
    )
  }
}

export default Feed
