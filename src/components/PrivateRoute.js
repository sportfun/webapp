import { Redirect, Route } from 'react-router-dom'
import AuthManager from './AuthManager'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class PrivateRoute extends Component {
  static propTypes = {
    requiredRank: PropTypes.oneOf(AuthManager.ranks).isRequired,
    component: PropTypes.func,
    render: PropTypes.func,
  }

  render() {
    const { requiredRank, component: Component, render, ...rest } = this.props
    if (!AuthManager.isAuthorized(requiredRank)) {
      return (
        <Route
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname: requiredRank === 'anonymous' ? '/' : '/connexion',
                state: { from: props.location },
              }}
            />
          )}
        />
      )
    }
    return (
      <Route
        {...rest}
        render={Component ? props => <Component {...props} /> : render}
      />
    )
  }
}

export default PrivateRoute
