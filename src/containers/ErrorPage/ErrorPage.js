import DocumentTitle from 'react-document-title'
import React, { Component } from 'react'

class ErrorPage extends Component {
  render() {
    return (
      <DocumentTitle title="Page non trouvée">
        <p>Page non trouvée</p>
      </DocumentTitle>
    )
  }
}

export default ErrorPage
