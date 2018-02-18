import React, { Component } from 'react'
import axios from 'axios'
import history from '../functions/history'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '', stayLoggedIn: true }
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
    axios.post('http://149.202.41.22:8080/api/user/login', {
      username: this.state.username,
      password: this.state.password,
    }).then(response => {
      if (this.state.stayLoggedIn) {
        localStorage.setItem('token', response.data.data.token)
      } else {
        sessionStorage.setItem('token', response.data.data.token)
      }
      history.push('/')
    }).catch(error => {
      const state = {}
      this.setState(state)
      console.log(error.response)
    })
  }

  render() {
    return (
      <div className="pagecontainer p-sm-5">
        <h3>Connexion</h3><br />
        <form onSubmit={this.submit}>
          <div className="form-group w-50">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" name="username" className="form-control" id="username"
              value={this.state.username} onChange={this.onChange} />
          </div>
          <div className="form-group w-50">
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
      </div>
    )
  }
}

export default Login
