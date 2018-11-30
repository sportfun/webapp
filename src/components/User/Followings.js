import React from 'react'
import ApiManager from '../ApiManager'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar';

class Followings extends React.Component {
  constructor() {
    super()
    this.state = {
      links: [],
      friends: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getLinks().then(() => {
      this.loadFriends()
    })
  }

  loadFriends() {
    this.state.links.forEach(idLink => {
      ApiManager.getUserById(idLink)
        .then((friend) => {
          this.setState({ friends: [...this.state.friends, friend] })
        })
    });
  }

  getLinks() {
    return ApiManager.getFriends()
      .then(links => {
        this.setState({
          links: links,
          loading: false,
        })
      })
      .catch(error => console.error(error))
  }

  render() {
    if (this.state.loading) {
      return (<p>Chargement…</p>)
    }

    if (this.state.friends.length === 0) {
      return (
        <div className="container card mb-4 p-sm-4" >
          <h4>Vous n'avez pas encore d'abonnement</h4>
        </div>
      )
    } else {
      return (
        <div className="container">
          <div className="card-deck">
            {this.state.friends.map((friend, i) =>
              <Friend key={i} friend={friend} />
            )}</div>
        </div>
      )
    }
  }
}

class Friend extends React.Component {
  render() {
    return (
      <div className="card m-2" style={{ "min-width": "10rem", "max-width": "10rem" }}>
        <Link to={`/profile/${this.props.friend.username}`}>
          <div className="pt-3 px-0 m-3 text-center">
            <Avatar isLittle={true} profilepic={this.props.friend.profilePic} alt={`${this.props.friend.firstName} ${this.props.friend.lastName}`} />
            <div className="card-body py-3 px-0 text-center">
              <p className="card-text">
                  {`${this.props.friend.firstName} ${this.props.friend.lastName}`}
              </p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default Followings
