import { Link, Redirect } from 'react-router-dom'
import AuthManager from '../../AuthManager'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class LoginForm extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      stayLoggedIn: true,
      redirectToReferrer: false,
      alertMessage: '',
    }
  }

  onChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  submit = e => {
    e.preventDefault()
    AuthManager.authenticate(
      this.state.username,
      this.state.password,
      this.state.stayLoggedIn,
    )
      .then(() => this.setState({ redirectToReferrer: true }))
      .catch(errorMessage => {
        const state = {
          alertMessage: errorMessage,
        }
        this.setState(state)
      })
  }

  render() {
    const { match } = this.props
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
    }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer) {
      return <Redirect to={from} />
    }
    return (
      <DocumentTitle title="Connexion">
        <div className="container">
          <h2>Connexion</h2>
          {this.state.alertMessage && (
            <p className="alert alert-danger">{this.state.alertMessage}</p>
          )}
          <form onSubmit={this.submit}>
            <div className="form-group w-50">
              <label htmlFor="username">Nom d&apos;utilisateur</label>
              <input
                type="text"
                name="username"
                className="form-control"
                id="username"
                value={this.state.username}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group w-50">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                name="stayLoggedIn"
                className="form-check-input"
                id="stayLoggedIn"
                checked={this.state.stayLoggedIn}
                onChange={this.onChange}
              />
              <label className="form-check-label" htmlFor="stayLoggedIn">
                Se souvenir de moi
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </form>
          <Link to={`${match.url}/mot-de-passe-oublie`}>
            Mot de passe oublié ?
          </Link>
        </div>
      </DocumentTitle>
    )
  }
}

export default LoginForm
