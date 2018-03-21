import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class SearchResults extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const searchTerm = this.props.match.params.search
    return (
      <DocumentTitle title={`Recherche : ${searchTerm}`}>
        <div className="container">
          <h1>Recherche : {searchTerm}</h1>
        </div>
      </DocumentTitle>
    )
  }
}

export default SearchResults
