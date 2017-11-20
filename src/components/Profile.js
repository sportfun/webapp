import React from 'react'
import axios from 'axios'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.getUserByUsername = this.getUserByUsername.bind(this)
    this.state = {
      user: {},
      loading: true
    }
  }

  componentWillMount() {
    this.getUserByUsername(this, "JeanMichel");
  }

  getUserByUsername = (self, username) => {
    axios.get('http://149.202.41.22:8080/api/users')
      .then(response => {
        response.data.forEach(function (item) {
          if (item.userName === username)
            self.setState({
              user: item,
              loading: false
            })
        });
      })
      .catch((error) => {
        console.log("error", error)
      })
  }

  render() {
    if (this.state.loading) {
      return false;
    }
    else {
      return (
        <div id="ProfilePage" className="card mb-4">
          <div className="card">
            <img className="cover-photo" alt="cover_photo" src={this.state.user.coverPicture} />
            <img className="rounded-avatar" alt="avatar" src={this.state.user.profilePicture} />
            <div className="info-user p-sm-3">
              <p>{this.state.user.firstName} {this.state.user.lastName}<br />
                Salle de sport LifestyleSport<br />
                @{this.state.user.userName}<br />
              </p>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Profile