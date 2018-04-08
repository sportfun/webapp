import { Link, withRouter } from 'react-router-dom'
import AuthManager from '../../AuthManager'
import NavLink from '../NavLink'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import cx from 'classnames'

class Navigation extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  navItems = [
    {
      to: '/',
      content: 'Accueil',
      rank: 'any',
      exact: true,
    },
    {
      to: '/connexion',
      content: 'Connexion',
      rank: 'anonymous',
    },
    {
      to: '/inscription',
      content: 'Inscription',
      rank: 'anonymous',
    },
  ]

  render() {
    const wrapper = ({ match, children }) => (
      <li className={cx('nav-item', { active: match })}>{children}</li>
    )
    const activeChild = () => <span className="sr-only">(current)</span>
    return (
      <ul className="navbar-nav mr-auto">
        {this.navItems
          .filter(item => AuthManager.isAuthorized(item.rank))
          .map((item, i) => {
            return (
              <NavLink
                to={item.to}
                exact={item.exact || false}
                wrapper={wrapper}
                activeChild={activeChild}
                className="nav-link"
                key={i}
              >
                {item.content}
              </NavLink>
            )
          })}
        {AuthManager.isAuthenticated() && ( // TODO Utiliser SessionConsumer
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="/profil"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Mon compte
            </Link>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <button
                className="dropdown-item text-danger"
                type="button"
                onClick={() => {
                  AuthManager.logout()
                  this.props.history.push('/')
                }}
              >
                Déconnexion
              </button>
            </div>
          </li>
        )}
      </ul>
    )
  }
}

export default withRouter(Navigation)
