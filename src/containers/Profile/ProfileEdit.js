import { Link } from 'react-router-dom'
import { SessionConsumer } from '../../SessionContext'
import ApiManager from '../../ApiManager'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class ProfileEdit extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  static contextTypes = {
    orangecolor: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    ApiManager.getUser().then(user => {
      this.setState({ user: user, loading: false })
    })
  }

  submit = e => {
    e.preventDefault()
    // TODO
  }

  render() {
    if (this.state.loading) {
      return <p>Chargement…</p>
    }
    const coords = { x1: 0, y1: 0, x2: 550, y2: 0 }
    return (
      <DocumentTitle title="Modifier mon profil">
        <SessionConsumer>
          {context => (
            <div className="container">
              <h1>Modifier mon profil</h1>
              <Link
                to={`${this.props.match.url}/${context.state.user.username}`}
              >
                Voir mon profil
              </Link>
              <div id="AdministrationAccount" className="card mb-4">
                <div className="card">
                  <div className="info-user p-sm-3">
                    <h2> Paramètres du compte </h2>
                    <form onSubmit={this.submit}>
                      <div className="row pt-4 my-1">
                        <label
                          htmlFor="firstName"
                          className="col-sm-4 col-form-label"
                        >
                          Prénom
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder={this.state.user.firstName}
                          />
                        </div>
                      </div>
                      <svg
                        height="2"
                        width="100%"
                        style={{ verticalAlign: 'middle' }}
                      >
                        <line
                          {...coords}
                          stroke={this.context.orangecolor}
                          strokeWidth={2}
                        />
                      </svg>

                      <div className="row my-1">
                        <label
                          htmlFor="lastName"
                          className="col-sm-4 col-form-label"
                        >
                          Nom
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder={this.state.user.lastName}
                          />
                        </div>
                      </div>
                      <svg
                        height="2"
                        width="100%"
                        style={{ verticalAlign: 'middle' }}
                      >
                        <line
                          {...coords}
                          stroke={this.context.orangecolor}
                          strokeWidth={2}
                        />
                      </svg>

                      <div className="row my-1">
                        <label
                          htmlFor="email"
                          className="col-sm-4 col-form-label"
                        >
                          Mail
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder={this.state.user.email}
                          />
                        </div>
                      </div>
                      <svg
                        height="2"
                        width="100%"
                        style={{ verticalAlign: 'middle' }}
                      >
                        <line
                          {...coords}
                          stroke={this.context.orangecolor}
                          strokeWidth={2}
                        />
                      </svg>

                      <div className="row my-1">
                        <label
                          htmlFor="password"
                          className="col-sm-4 col-form-label"
                        >
                          Mot de passe
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="●●●●●●"
                          />
                        </div>
                      </div>
                      <svg
                        height="2"
                        width="100%"
                        style={{ verticalAlign: 'middle' }}
                      >
                        <line
                          {...coords}
                          stroke={this.context.orangecolor}
                          strokeWidth={2}
                        />
                      </svg>

                      <div className="row my-1">
                        <label
                          htmlFor="goal"
                          className="col-sm-4 col-form-label"
                        >
                          Objectif sportif (mn)
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="goal"
                            placeholder={this.state.user.goal}
                          />
                        </div>
                      </div>
                      <svg
                        height="2"
                        width="100%"
                        style={{ verticalAlign: 'middle' }}
                      >
                        <line
                          {...coords}
                          stroke={this.context.orangecolor}
                          strokeWidth={2}
                        />
                      </svg>

                      <div className="row my-1">
                        <label
                          htmlFor="biography"
                          className="col-sm-4 col-form-label"
                        >
                          Biographie
                        </label>
                        <div className="col-sm-8">
                          <textarea
                            className="form-control"
                            id="biography"
                            rows="5"
                            maxLength="160"
                            placeholder={this.state.user.bio}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary float-right mt-2"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SessionConsumer>
      </DocumentTitle>
    )
  }
}

export default ProfileEdit
