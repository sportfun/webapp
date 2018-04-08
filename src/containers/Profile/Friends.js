import { Link } from 'react-router-dom'
import ApiManager from '../../ApiManager'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Statistics extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      activities: [],
      loading: true,
    }
  }

  componentDidMount() {
    ApiManager.getFriends().then(friends => {
      this.setState({ friends: friends, loading: false })
    })
  }

  renderFriend(friend, i) {
    return (
      <div
        className="card border-secondary mb-3"
        style={{ width: '18rem' }}
        key={i}
      >
        <img
          className="card-img-top"
          src="/images/user_default.jpg"
          alt={friend}
        />
        <div className="card-body">
          <p className="card-text">
            <Link to={`/profil/${friend}`}>{friend}</Link>
          </p>
          <button
            className="btn btn-danger"
            onClick={() => this.removeFriend(friend)}
          >
            Supprimer
          </button>
        </div>
      </div>
    )
  }

  removeFriend(friendToRemove) {
    this.setState(({ friends }) => ({
      friends: friends.filter(friend => friend !== friendToRemove),
    }))
  }

  render() {
    if (this.state.loading) {
      return <p>Chargement…</p>
    }
    const username = this.props.user.username
    return (
      <DocumentTitle title={`Amis de ${username}`}>
        <div className="container">
          <h1>Amis de {username}</h1>
          <div className="card-deck">
            {this.state.friends.map((friend, i) =>
              this.renderFriend(friend, i),
            )}
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default Statistics
