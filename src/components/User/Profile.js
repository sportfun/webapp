import React from 'react'
import ApiManager from '../ApiManager'
import coverpic from '../../assets/img/cover_default.jpg'
import Avatar from '../Avatar'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      loading: false,
      followButtonDisabled: false,
      iFollowThisUser: false,
    }
  }

  componentWillMount() {
    var username = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1)
    this.getProfile(username)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false,
      followButtonDisabled: false,
      iFollowThisUser: false
    }, () => {
      var username = nextProps.location.pathname.substr(nextProps.location.pathname.lastIndexOf('/') + 1)
      this.getProfile(username)
    })
  }

  getProfile(username) {
    ApiManager.getUser(username).then(user => {
      this.setState({ user: user })
      ApiManager.getUser().then(self => {
        if (user._id === self._id) {
          this.setState({
            followButtonDisabled: true,
          })
          return
        }
        if (self.links.includes(user._id)) {
          this.setState({
            iFollowThisUser: true,
          })
        }
      })
    })
  }

  follow = () => {
    this.setState({
      followButtonDisabled: true,
    })
    ApiManager.followUser(this.state.user._id).then(() => {
      this.setState(oldState => {
        return {
          iFollowThisUser: !oldState.iFollowThisUser,
        }
      })
    }).finally(() => this.setState({
      followButtonDisabled: false,
    }))
  }

  render() {
    if (!!this.state.user.username) {
      return (
        <div id="ProfilePage" className="card mb-4">
          <div className="card">
            <img className="cover-photo" alt="coverPicture" src={coverpic} />
            <Avatar isLittle={false} profilepic={this.state.user.profilePic} />
            <div className="info-user p-sm-3">
              <p>{this.state.user.firstName} {this.state.user.lastName}<br />
                @{this.state.user.username}<br /><br />
                {this.state.user.bio}<br />
              </p>
              {!!this.state.user.links &&
                <p>{this.state.user.links.length > 0 ? this.state.user.links.length > 1
                  ? `${this.state.user.links.length} abonnements` : '1 abonnement' : 'Aucun abonnement'}</p>
              }
              <button className="btn btn-success" onClick={this.follow}
                disabled={this.state.followButtonDisabled}>{this.state.iFollowThisUser ? 'Se désabonner'
                  : 'S\'abonner'}</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <p>Chargement…</p>
      )
    }
  }
}

export default Profile
