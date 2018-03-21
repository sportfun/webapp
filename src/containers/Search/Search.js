import { Route } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SearchResults from './SearchResults'

class Search extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props
    return (
      <DocumentTitle title="Recherche">
        <div className="container">
          <h1>Recherche</h1>
          <Route path={`${match.url}/:search`} component={SearchResults} />
        </div>
      </DocumentTitle>
    )
  }
}

export default Search
