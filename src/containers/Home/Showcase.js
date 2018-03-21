import {
  FormattedDate,
  FormattedNumber,
  FormattedPlural,
  FormattedTime,
} from 'react-intl'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import React, { Component } from 'react'

class Showcase extends Component {
  render() {
    const unreadCount = 1
    return (
      <DocumentTitle title="Accueil">
        <div className="container">
          <h1>Bonjour</h1>
          <p>
            Nous sommes le{' '}
            <FormattedDate
              value={Date.now()}
              year="numeric"
              month="long"
              day="numeric"
            />{' '}
            et il est <FormattedTime value={Date.now()} />
          </p>
          <p>
            <strong>Messagerie</strong>
          </p>
          <p>
            Vous avez <FormattedNumber value={unreadCount} />{' '}
            <FormattedPlural
              value={unreadCount}
              one="message"
              other="messages"
            />
          </p>
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
