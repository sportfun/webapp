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
                                <span className="mr-3"><img className="MenuIcon" src="ressources/today.png" alt="today" /></span><Link to='/'>Aujourd'hui</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="ressources/journal.png" alt="activity" /></span><Link to='/'>Journal d'activités</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="ressources/stats.png" alt="statistics" /></span><Link to='/statistics'>Graphiques</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="ressources/friends.png" alt="friends" /></span><Link to='/'>Amis</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="ressources/messages.png" alt="messages" /></span><Link to='/'>Messages</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="ressources/settings.png" alt="settings" /></span><Link to='/'>Mon compte</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SidebarLeft