import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class CoachSidebar extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-2 d-none d-md-block sidebar">
          <nav id="sidebar" className="sidebar-nav">
            <li className="sidebar-brand">
              <Link to="/">Retour à l&apos;accueil</Link>
            </li>

            <ul className="list-unstyled components">
              <li className="active">
                <Link to="/">Voir vos clients</Link>
              </li>
              <li>
                <Link to="/">Gérer les séances</Link>
              </li>
              <li>
                <Link to="/">Mon compte</Link>
              </li>
            </ul>
          </nav>

          <div id="content" />
        </div>
        <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default CoachSidebar
