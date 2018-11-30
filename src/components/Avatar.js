import React from 'react'
import profilepic from '../assets/img/user_default.jpg'

class Avatar extends React.Component {

    render() {
        if (this.props.isLittle) {
            if (this.props.profilepic) {
                if (this.props.profilepic.includes("gravatar")) {
                    return (
                        <img className="rounded-circle align-self-center mr-2" alt="avatar" src={this.props.profilepic} style={{ maxWidth: '2rem' }} />
                    )
                }
            }
            return (
                <img className="rounded-circle align-self-center mr-2" alt="avatar" src={profilepic} style={{ maxWidth: '2rem' }} />
            )
        } else {
            if (this.props.profilepic) {
                if (this.props.profilepic.includes("gravatar")) {
                    return (
                        <img className="rounded-avatar" alt="avatar" src={this.props.profilepic} />
                    )
                }
            }
            return (
                <img className="rounded-avatar" alt="avatar" src={profilepic} />
            )
        }
    }
}

export default Avatar
