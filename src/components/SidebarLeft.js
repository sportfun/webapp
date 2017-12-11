import React from 'react'
import { Link } from 'react-router-dom'

class SidebarLeft extends React.Component {

    render() {
        return (
            <div id="DashboardLeft" className="col-3">

                <div id="ProfileCard" className="card mb-4">
                    <div className="card-header">
                        <Link to={`/profile/${this.props.myuser.userName}`}><img className="cover-photo" alt="cover_photo_sidebar" src={this.props.myuser.coverPicture} /></Link>
                    </div>
                    <div className="card-footer text-center">
                        <Link to={`/profile/${this.props.myuser.userName}`}><img className="rounded-avatar" alt="avatar" src={this.props.myuser.profilePicture} /></Link>
                        <Link to={`/profile/${this.props.myuser.userName}`}><div className="mb-3"> {this.props.myuser.firstName} {this.props.myuser.lastName}</div></Link>
                        <div className="mb-3"> Salle de sport LifestyleSport </div>
                    </div>
                </div>

                <div id="MenuLeftCard" className="card mb-4">
                    <div className="card-footer">
                        <ul className="Menu list-unstyled">
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="https://cdn.discordapp.com/attachments/250745088097910784/382221294642397221/today.png" alt="today" /></span><Link to='/'>Aujourd'hui</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="https://cdn.discordapp.com/attachments/250745088097910784/382221188874895380/journal.png" alt="activity" /></span><Link to='/'>Journal d'activités</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="https://cdn.discordapp.com/attachments/250745088097910784/382221273507561475/stats.png" alt="statistics" /></span><Link to={`/statistics/${this.props.myuser.userName}`}>Graphiques</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="https://cdn.discordapp.com/attachments/250745088097910784/382221231174451210/friends.png" alt="friends" /></span><Link to='/'>Amis</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="https://cdn.discordapp.com/attachments/250745088097910784/382221256923021332/messages.png" alt="messages" /></span><Link to='/'>Messages</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="https://cdn.discordapp.com/attachments/250745088097910784/382221333490302986/settings.png" alt="settings" /></span><Link to='/'>Mon compte</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SidebarLeft