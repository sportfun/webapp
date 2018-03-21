import { Route, Switch } from 'react-router-dom'
import LoginForm from './LoginForm'
import PasswordResetForm from './PasswordResetForm'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Login extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props
    return (
      <Switch>
        <Route exact path={match.url} component={LoginForm} />
        <Route
          exact
          path={`${match.url}/mot-de-passe-oublie`}
          component={PasswordResetForm}
        />
      </Switch>
    )
  }
}

export default Login
