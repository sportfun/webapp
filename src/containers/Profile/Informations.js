import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Informations extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  render() {
    const username = this.props.user.username
    const { match } = this.props
    return (
      <DocumentTitle title={`Profil de ${username}`}>
        <div className="container">
          <h1>Profil de {username}</h1>
          <p>
            <Link to={`${match.url}/statistiques`}>Statistiques</Link>
          </p>
          <p>
            <Link to={`${match.url}/activites`}>Activités</Link>
          </p>
          <p>
            <Link to={`${match.url}/amis`}>Amis</Link>
          </p>
        </div>
      </DocumentTitle>
    )
  }
}

export default Informations
