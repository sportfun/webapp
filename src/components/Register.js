import React, { Component } from 'react'
import axios from 'axios'
import history from '../functions/history'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state =
      { username: '', password: '', email: '', firstName: '', lastName: '', birthdate: Register.formatDate(Date.now()) }
  }

  static formatDate(date) {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = '' + d.getFullYear()

    year = year.padStart(4, '0')
    month = month.padStart(2, '0')
    day = day.padStart(2, '0')

    return [year, month, day].join('-')
  }

  onChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: target.type === 'date' ? Register.formatDate(value) : value,
    })
  }

  submit = e => {
    e.preventDefault()
    const date = new Date(this.state.birthdate)
    axios.post('http://149.202.41.22:8080/api/user/register', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthDate: date.toString(),
    }).then(() => {
      history.push('/connexion')
    }).catch(error => {
      const state = {}
      this.setState(state)
      console.log(error.response)
    })
  }

  render() {
    return (
      <div className="pagecontainer p-sm-5">
        <h3>Inscription</h3><br />

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
          <div className="form-group w-50">
            <label htmlFor="email">Adresse mail</label>
            <input type="email" name="email" className="form-control" id="email"
              value={this.state.email} onChange={this.onChange} />
          </div>
          <div className="form-group w-50">
            <label htmlFor="firstName">Prénom</label>
            <input type="text" name="firstName" className="form-control" id="firstName"
              value={this.state.firstName} onChange={this.onChange} />
          </div>
          <div className="form-group w-50">
            <label htmlFor="lastName">Nom</label>
            <input type="text" name="lastName" className="form-control" id="lastName"
              value={this.state.lastName} onChange={this.onChange} />
          </div>
          <div className="form-group w-50">
            <label htmlFor="birthdate">Date de naissance</label>
            <input type="date" name="birthdate" className="form-control" id="birthdate"
              value={this.state.birthdate} onChange={this.onChange} />
          </div>
          <button type="submit" className="btn btn-primary">S'inscrire</button>
        </form>
      </div>
    )
  }
}

export default Register
