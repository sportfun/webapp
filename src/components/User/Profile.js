import React from 'react'
import PropTypes from 'prop-types'
import { getUserByUsername } from '../../functions/getRequest'
import ApiManager from '../ApiManager'

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
    getUserByUsername(this.context.token, username, (data) => {
      this.setState({ user: data })
      this.setState({ loading: true })
      ApiManager.getUser().then(user => {
        if (user._id === data._id) {
          this.setState({
            followButtonDisabled: true,
          })
          return
        }
        if (user.links.includes(data._id)) {
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
    if (!this.state.loading) {
      return null
    }
    return (
      <div id="ProfilePage" className="card mb-4">
        <div className="card">
          <img className="cover-photo" alt="coverPicture" src={this.context.apiurl + this.state.user.coverPic} />
          <img className="rounded-avatar" alt="avatar" src={this.context.apiurl + this.state.user.profilePic} />
          <div className="info-user p-sm-3">
            <p>{this.state.user.firstName} {this.state.user.lastName}<br />
              @{this.state.user.username}<br /><br />
              {this.state.user.bio}<br />
            </p>
            <p>{this.state.user.links.length > 0 ? this.state.user.links.length > 1
              ? `${this.state.user.links.length} abonnés` : '1 bonné' : 'Aucun abonné'}</p>
            <button className="btn btn-success" onClick={this.follow}
              disabled={this.state.followButtonDisabled}>{this.state.iFollowThisUser ? 'Se désabonner'
              : 'S\'abonner'}</button>
          </div>
        </div>
      </div>
    )
  }
}

Profile.contextTypes = {
  token: PropTypes.string,
  apiurl: PropTypes.string,
}

export default Profile
