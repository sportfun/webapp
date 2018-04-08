import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import React, { Component } from 'react'

class Showcase extends Component {
  render() {
    return (
      <DocumentTitle title="Accueil">
        <div className="container">
          <h1>Bonjour</h1>
          <p>
            <Link to="/connexion">Connectez-vous</Link> ou{' '}
            <Link to="/inscription">inscrivez-vous</Link>
          </p>
        </div>
      </DocumentTitle>
    )
  }
}

export default Showcase
