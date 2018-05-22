import React from 'react'
import ApiManager from './ApiManager'
import { Link } from 'react-router-dom'
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
    ApiManager.getPosts()
      .then(posts => {
        this.setState({
          posts: posts,
          loading: false,
        })
      })
      .catch(error => console.error(error))
  }

  handleChange = (event) => {
    this.setState({ statusValue: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      buttonPublishedDisabled: true,
    })
    ApiManager.post(this.state.statusValue).then(() => this.setState({
      statusValue: '',
      buttonPublishedDisabled: false,
    }))
  }

  render() {
    if (this.state.loading) {
      return (<p>Chargement…</p>)
    }

    return (
      <div className="container">
        <h3>Fil d'actualité</h3>
        <form className="m-2" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Publier sur mon mur</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.statusValue}
              onChange={this.handleChange} />
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
      likes: this.props.post.likes,
      comments: [],
      buttonCommentsDisabled: this.props.post.comments.length === 0,
      buttonLikeDisabled: false,
      iLiked: false,
    }
  }

  showComments = () => {
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
          likes: previousState.iLiked ? previousState.likes - 1 : previousState.likes + 1,
          buttonLikeDisabled: false,
          iLiked: !previousState.iLiked,
        }
      })
    }).catch(() => this.setState({
      buttonLikeDisabled: false,
    }))
  }

  render() {
    return (
      <div className="card m-2" style={{ marginBottom: '2rem' }}>
        <div className="card-body">
          <p className="card-text">{this.props.post.content}</p>
          <p className="card-text text-muted text-right">Publié par {this.props.post.author.firstName} {this.props.post.author.lastName} <Moment locale="fr"
              date={this.props.post.createdAt} fromNow /></p>
          <p className="card-text text-muted">{this.state.likes > 0
            ? this.state.likes > 1
              ? this.state.likes + ' personnes aiment cette publication'
              : '1 personne aime cette publication'
            : 'Personne n\'a aimé cette publication'}</p>
          <button className="btn btn-primary mr-2" onClick={this.like}
            disabled={this.state.buttonLikeDisabled}>{this.state.iLiked ? '👎 Je n\'aime plus' : '👍 J\'aime'}</button>
          <button className="btn btn-primary" onClick={this.showComments}
            disabled={this.state.buttonCommentsDisabled}>{this.props.post.comments.length > 0
            ? this.props.post.comments.length > 1 ? 'Afficher ' + this.props.post.comments.length + ' commentaires'
              : 'Afficher 1 commentaire'
            : 'Aucun commentaire'}</button>
          <div className="comments">{this.state.comments.map((comment, i) => {
            return (
              <div className="bg-light m-2 p-2" key={i}>
                <img className="rounded-circle" src={comment.author.profilePic} alt="Photo de profil"
                  style={{ maxWidth: '5rem' }} />
                <p>{comment.content}</p>
                <p className="text-muted">Publié par {comment.author.firstName} {comment.author.lastName} <Moment locale="fr"
                    date={comment.createdAt} fromNow /></p>
              </div>
            )
          })}</div>
        </div>
      </div>
    )
  }
}

export default Feed
