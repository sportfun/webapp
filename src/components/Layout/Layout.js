import Footer from '../Footer'
import Header from '../Header'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div>
        <Header />
        <main>{this.props.children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout
