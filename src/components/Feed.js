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
        <form className="mb-4" onSubmit={this.handleStatusSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Publier sur mon mur&nbsp;:</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.statusValue}
              onChange={this.handleStatusChange} />
          </div>
          <input className="btn btn-outline-success d-block ml-auto" type="submit" value="Publier" />
        </form>
        <ul className="list-group">
          {this.state.posts.slice(0).reverse().map((post, i) => <FeedItem key={i} post={post} />)}
        </ul>
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
          iLiked: true,
        })
      }
    })
    this.refreshLikes()
  }

  refreshLikes() {
    ApiManager.getPost(this.state.id).then(post => {
      this.setState({
        likes: post.likes,
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
      <li className="list-group-item flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.post.content}</h5>
          <small><Moment locale="fr" date={this.props.post.createdAt} fromNow /></small>
        </div>
        <div className="d-flex w-100 align-items-center mb-3">
          <img className="rounded-circle align-self-center mr-2" src={this.props.post.author.profilePic}
            alt="Photo de profil"
            style={{ maxWidth: '2rem' }} />
          <small>Publié par {this.props.post.author.firstName} {this.props.post.author.lastName}</small>
        </div>
        <p>
          <small>{this.state.likes.length > 0 ? this.state.likes.length > 1 ? this.state.likes.length +
                                                                              ' personnes aiment cette publication'
            : '1 personne aime cette publication' : 'Personne n\'a aimé cette publication'}</small>
        </p>
        <button className="btn btn-outline-success mb-2 btn-sm" onClick={this.like}
          disabled={this.state.buttonLikeDisabled}>{this.state.iLiked ? '👎 Je n\'aime plus' : '👍 J\'aime'}</button>
        <div className="comments">{this.state.comments.map((comment, i) => {
          return (
            <div className="bg-light m-2 p-2" key={i}>
              <p>{comment.content}</p>
              <div className="d-flex w-100 align-items-center">
                <img className="rounded-circle align-self-center mr-2" src={comment.author.profilePic}
                  alt="Photo de profil"
                  style={{ maxWidth: '2rem' }} />
                <small>Publié par {comment.author.firstName} {comment.author.lastName} <Moment locale="fr"
                  date={comment.createdAt} fromNow /></small>
              </div>
            </div>
          )
        })}</div>
        <form className="m-2" onSubmit={this.handleCommentSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Écrire un commentaire&nbsp;:</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"
              value={this.state.commentValue}
              onChange={this.handleCommentChange} />
          </div>
          <input className="btn btn-outline-success d-block ml-auto" type="submit" value="Envoyer" />
        </form>
      </li>
    )
  }
}

export default Feed
