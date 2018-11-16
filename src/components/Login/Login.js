import React, { Component } from 'react'
import AuthManager from '../AuthManager'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Login.css'
import Logo from '../../assets/img/logo.png'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      stayLoggedIn: true,
      alertMessage: ''
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
      .catch(() => {
        const state = {
          alertMessage: "Connexion échouée: nom d'utilisateur ou mot de passe erroné"
        }
        this.setState(state);
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
      <div>
        <img className="logo" src={Logo} alt="logo" />
        <div className="section">
          <div className="pagecontainer p-sm-5 ml-0 mt-5">
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
              <div className="form-check py-2">
                <input type="checkbox" name="stayLoggedIn" className="form-check-input" id="stayLoggedIn"
                  checked={this.state.stayLoggedIn} onChange={this.onChange} />
                <label className="form-check-label" htmlFor="stayLoggedIn">Se souvenir de moi</label>
              </div>
              <button type="submit" className="btn btn-outline-success pt-2">Se connecter</button>
            </form>
            <Link to="/inscription" className="btn btn-secondary mt-2">S'inscrire</Link>
          </div>
        </div>
      </div>

    )
  }
}

Login.contextTypes = {
  apiurl: PropTypes.string,
};

export default Login
