import React from 'react'
import PropTypes from 'prop-types'
import ApiManager from '../ApiManager';
import coverpic from '../../assets/img/cover_default.jpg'
import Avatar from '../Avatar'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            loading: false,
        }
    }

    componentWillMount() {
        this.getProfile()
    }

    getProfile() {
        ApiManager.getUser().then(user => {
          this.setState({
              user: user,
              loading: true,
         })
        })
      }

    render() {
        if (!this.state.loading) { return null }
        return (
            <div className="pagecontainer h-100 Block card p-sm-5">
                <div id="ProfilePage" className="card mb-4 ml-5">

                    <div className="card">
                        <img className="cover-photo" alt="coverPicture" src={coverpic} />
                        <Avatar isLittle={false} profilepic={this.state.user.profilePic} />
                        <div className="info-user p-sm-3">
                            <p>{this.state.user.firstName} {this.state.user.lastName}<br />
                                @{this.state.user.username}<br /><br />
                                {this.state.user.bio}<br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profile.contextTypes = {
    token: PropTypes.string,
    apiurl: PropTypes.string,
};

export default Profile