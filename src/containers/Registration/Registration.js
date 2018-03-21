import ApiManager from '../../ApiManager'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Registration extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      birthdate: Registration.formatDate(Date.now()),
      alertMessage: '',
    }
  }

  static formatDate(date) {
    // TODO Utiliser react-datepicker
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
      [name]: target.type === 'date' ? Registration.formatDate(value) : value,
    })
  }

  submit = e => {
    e.preventDefault()
    const date = new Date(this.state.birthdate)
    ApiManager.register(
      this.state.username,
      this.state.password,
      this.state.email,
      this.state.firstName,
      this.state.lastName,
      date.toString(),
    )
      .then(() => {
        this.props.history.push('/connexion')
      })
      .catch(errorMessage => {
        const state = {
          alertMessage: errorMessage,
        }
        this.setState(state)
        window.scrollTo(0, 0)
      })
  }

  render() {
    return (
      <DocumentTitle title="Inscription">
        <div className="container">
          <h2>Inscription</h2>
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
            <div className="form-group w-50">
              <label htmlFor="email">Adresse mail</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group w-50">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                id="firstName"
                value={this.state.firstName}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group w-50">
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                id="lastName"
                value={this.state.lastName}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group w-50">
              <label htmlFor="birthdate">Date de naissance</label>
              <input
                type="date"
                name="birthdate"
                className="form-control"
                id="birthdate"
                value={this.state.birthdate}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              S&apos;inscrire
            </button>
          </form>
        </div>
      </DocumentTitle>
    )
  }
}

export default Registration
