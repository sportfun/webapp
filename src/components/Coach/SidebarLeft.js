import React from 'react'
import { Link } from 'react-router-dom'

class SidebarLeft extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true
        }
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
                            <li className="active"><Link to='/'>Voir vos clients</Link></li>
                            <li><Link to='/'>Gérer les séances</Link></li>
                            <li><Link to='/'>Mon compte</Link></li>
                        </ul>
                    </nav>

                    <div id="content">
                    </div>
                </div>
            )
        }
        else {
            return (null);
        }
    }
}

export default SidebarLeft