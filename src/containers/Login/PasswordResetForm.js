import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import React, { Component } from 'react'

class Organization extends Component {
  render() {
    return (
      <DocumentTitle title="Mot de passe oublié">
        <div className="container">
          <h2>Mot de passe oublié</h2>
          <Link to="/connexion">Se connecter</Link>
        </div>
      </DocumentTitle>
    )
  }
}

export default Organization
