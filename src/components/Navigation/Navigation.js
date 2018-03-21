import { SessionConsumer } from '../../SessionContext'
import AuthManager from '../../AuthManager'
import NavLink from '../NavLink'
import React, { Component } from 'react'
import cx from 'classnames'

class Navigation extends Component {
  navItems = [
    {
      to: '/',
      content: 'Accueil',
      rank: 'any',
      exact: true,
    },
    {
      to: '/profil',
      content: 'Profil',
      rank: 'authenticated',
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
      <SessionConsumer>
        {context => (
          <ul className="navbar-nav mr-auto">
            {this.navItems
              .filter(item =>
                AuthManager.isAuthorized(context.state.user.rank, item.rank),
              )
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
          </ul>
        )}
      </SessionConsumer>
    )
  }
}

export default Navigation
