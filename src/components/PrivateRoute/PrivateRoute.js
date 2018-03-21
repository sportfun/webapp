import { Redirect, Route } from 'react-router-dom'
import AuthManager from '../../AuthManager'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class PrivateRoute extends Component {
  static propTypes = {
    requiredRank: PropTypes.oneOf(AuthManager.ranks).isRequired,
    component: PropTypes.func,
  }

  render() {
    const { component: Component, requiredRank, ...rest } = this.props
    let isAllowed = false
    let redirection = '/'
    const userRank = AuthManager.getRank()
    if (AuthManager.isAuthorized(userRank, requiredRank)) {
      isAllowed = true
    } else if (requiredRank === 'anonymous') {
      redirection = '/'
    } else {
      redirection = '/connexion'
    }
    return (
      <Route
        {...rest}
        render={props =>
          isAllowed ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: redirection,
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )
  }
}

export default PrivateRoute
