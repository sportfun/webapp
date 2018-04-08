import { Redirect, Route } from 'react-router-dom'
import { SessionConsumer } from '../../SessionContext'
import AuthManager from '../../AuthManager'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class PrivateRoute extends Component {
  static propTypes = {
    requiredRank: PropTypes.oneOf(AuthManager.ranks).isRequired,
    component: PropTypes.func,
    render: PropTypes.func,
    userRank: PropTypes.string.isRequired,
  }

  render() {
    const { requiredRank, component: Component, render, ...rest } = this.props
    if (!AuthManager.isAuthorized(requiredRank, this.props.userRank)) {
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

// TODO displayName ?
// eslint-disable-next-line react/display-name
export default props => (
  <SessionConsumer>
    {context => <PrivateRoute {...props} userRank={context.state.user.rank} />}
  </SessionConsumer>
)
