import React from 'react'
import { Link } from 'react-router-dom'

class SidebarLeft extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true
        }
    }

    shouldRender() {
        if (window.location.pathname === '/') {
            this.setState({ display: false })
        } else {
            this.setState({ display: true })
        }
    }

    componentWillMount() {
        this.shouldRender();
    }

    componentWillReceiveProps() {
        this.shouldRender();
    }

    render() {
        if (this.state.display) {
            return (
                <div id="sidebar-wrapper">
                    <nav id="sidebar" className="sidebar-nav">
                        <li className="sidebar-brand">
                            <Link to="/">
                                Retour à l'accueil
                        </Link>
                        </li>

                        <ul className="list-unstyled components">
                            <li className="active"><Link to='/clientlist'>Gérer les clients</Link></li>
                            <li><Link to='/createsession'>Créer un entrainement</Link></li>
                            <li><Link to='/traininglist'>Gérer les entrainements</Link></li>
                            <li><Link to='/profile'>Visualiser le profil</Link></li>
                            <li><Link to='/account'>Mon compte</Link></li>
                        </ul>
                    </nav>
                    <div id="content">
                    </div>
                </div>
            )
        } else
            return null;
    }
}

export default SidebarLeft