import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CoverDefault from '../../assets/img/cover_default.jpg'
import ProfileDefault from '../../assets/img/user_default.jpg'
import ApiManager from '../ApiManager'

// Image
import today from '../../assets/img/today.png'
import stats from '../../assets/img/stats.png'
import settings from '../../assets/img/settings.png'
import messages from '../../assets/img/messages.png'
import activities from '../../assets/img/activities.png'
import friends from '../../assets/img/friends.png'

class SidebarLeft extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
        }
    }

    componentDidMount() {
        ApiManager.getInfoUser(this.context.token, (data) => {
            this.setState({ user: data });
        });
    }

    render() {
        let username = this.state.user.username;
        return (
            <div id="DashboardLeft" className="col-3">

                <div id="ProfileCard" className="card mb-4">
                    <div className="card-header">
                        <Link to={`/profile/${username}`}>
                        
                        <img className="cover-photo" alt="cover_photo_sidebar" src={CoverDefault} />

                        </Link>
                    </div>
                    <div className="card-footer text-center">
                        <Link to={`/profile/${username}`}>
                        
                        <img className="rounded-avatar" alt="avatar" src={ProfileDefault} />
                        
                        </Link>
                        <Link to={`/profile/${username}`}><div className="mb-3"> {this.state.user.firstName} {this.state.user.lastName}</div></Link>
                        <div className="mb-3">{this.state.user.bio} </div>
                        <div className="mb-3"> Salle de sport LifestyleSport </div>
                    </div>
                </div>

                <div id="MenuLeftCard" className="card mb-4">
                    <div className="card-footer">
                        <ul className="Menu list-unstyled">
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src={today} alt="today" /></span><Link to='/'>Aujourd'hui</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src={activities} alt="activity" /></span><Link to={`/activities/${username}`}>Journal d'activités</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src={stats} alt="statistics" /></span><Link to={`/statistics/${username}`}>Graphiques</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src={friends} alt="friends" /></span><Link to='/abonnements'>Abonnements</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src={messages} alt="messages" /></span><Link to='/messages'>Messages</Link>
                            </li>
                            <li>
                                <span className="mr-3"><img className="MenuIcon" src={settings} alt="settings" /></span>
                                <Link to={`/administration/${username}`}>Mon compte</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

//                        <img className="rounded-avatar" alt="avatar" src={this.context.apiurl + localStorage.getItem('profilePic')} />

//                        <img className="cover-photo" alt="cover_photo_sidebar" src={this.context.apiurl + "/static/cover_default.jpg"} />


SidebarLeft.contextTypes = {
    apiurl: PropTypes.string,
    token: PropTypes.string
};

export default SidebarLeft
