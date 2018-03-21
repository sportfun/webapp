import ApiManager from '../../ApiManager'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Statistics extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      activities: [],
      loading: true,
    }
  }

  componentDidMount() {
    ApiManager.getActivities().then(activities => {
      this.setState({ activities: activities, loading: false })
    })
  }

  render() {
    const username = this.props.user.username
    return (
      <DocumentTitle title={`Statistiques de ${username}`}>
        <div className="container">
          <h1>Statistiques de {username}</h1>
        </div>
      </DocumentTitle>
    )
  }
}

export default Statistics
