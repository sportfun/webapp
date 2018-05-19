import React, { Component } from 'react'
import AuthManager from './AuthManager'
import { Redirect, Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '', stayLoggedIn: true, alertMessage: '' }
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
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
    }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer) {
      return <Redirect to={from} />
    }
    return (
      <div className="pagecontainer p-sm-5">
        <h3>Connexion</h3><br />
        {this.state.alertMessage && <p className="alert alert-danger">{this.state.alertMessage}</p>}
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" name="username" className="form-control" id="username"
              value={this.state.username} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" className="form-control" id="password"
              value={this.state.password} onChange={this.onChange} />
          </div>
          <div className="form-check">
            <input type="checkbox" name="stayLoggedIn" className="form-check-input" id="stayLoggedIn"
              checked={this.state.stayLoggedIn} onChange={this.onChange} />
            <label className="form-check-label" htmlFor="stayLoggedIn">Se souvenir de moi</label>
          </div>
          <button type="submit" className="btn btn-primary">Se connecter</button>
        </form>
        <Link to="/inscription" className="btn btn-secondary">S'inscrire</Link>
      </div>
    )
  }
}

export default Login
