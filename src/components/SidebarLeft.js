import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SidebarLeft extends React.Component {

    render() {
        let username = localStorage.getItem('username');
        return (
            <div id="DashboardLeft" className="col-3">

                <div id="ProfileCard" className="card mb-4">
                    <div className="card-header">
                        <Link to={`/profile/${username}`}><img className="cover-photo" alt="cover_photo_sidebar" src={this.context.apiurl + "/static/cover_default.png"} /></Link>
                    </div>
                    <div className="card-footer text-center">
                        <Link to={`/profile/${username}`}><img className="rounded-avatar" alt="avatar" src={this.context.apiurl + localStorage.getItem('profilePic')} /></Link>
                        <Link to={`/profile/${username}`}><div className="mb-3"> {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</div></Link>
                        <div className="mb-3">{localStorage.getItem('bio')} </div>
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
                                <span className="mr-3"><img className="MenuIcon" src="ressources/stats.png" alt="statistics" /></span><Link to={`/statistics/${username}`}>Graphiques</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="ressources/friends.png" alt="friends" /></span><Link to='/'>Amis</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="ressources/messages.png" alt="messages" /></span><Link to='/'>Messages</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src="ressources/settings.png" alt="settings" /></span>
                                <Link to={`/administration/${username}`}>Mon compte</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

SidebarLeft.contextTypes = {
    apiurl: PropTypes.string
};

export default SidebarLeft