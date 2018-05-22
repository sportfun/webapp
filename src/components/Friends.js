import React from 'react'
import ApiManager from './ApiManager'
import { Link } from 'react-router-dom'

class Friends extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.loadFriends()
  }

  loadFriends() {
    return ApiManager.getFriends()
      .then(friends => {
        this.setState({
          friends: friends,
          loading: false,
        })
      })
      .catch(error => console.error(error))
  }

  render() {
    if (this.state.loading) {
      return (<p>Chargement…</p>)
    }

    return (
      <div className="container">
        <h3>Amis</h3>
        <div className="card-deck">{this.state.friends.map((friend, i) => <Friend key={i} friend={friend} />)}</div>
      </div>
    )
  }
}

class Friend extends React.Component {
  render() {
    return <div
      className="card border-secondary mb-3"
      style={{ width: '18rem' }}
    >
      <img
        className="card-img-top"
        src="/images/user_default.jpg"
        alt={`${this.props.friend.firstName} ${this.props.friend.lastName}`}
      />
      <div className="card-body">
        <p className="card-text">
          <Link
            to={`/profil/${this.props.friend.username}`}>{`${this.props.friend.firstName} ${this.props.friend.lastName}`}</Link>
        </p>
      </div>
    </div>
  }
}

export default Friends
