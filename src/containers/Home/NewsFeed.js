import DocumentTitle from 'react-document-title'
import React, { Component } from 'react'

class NewsFeed extends Component {
  render() {
    return (
      <DocumentTitle title="Fil d'actualité">
        <div className="container">
          <h1>Fil d&apos;actualité</h1>
        </div>
      </DocumentTitle>
    )
  }
}

export default NewsFeed
