import { Route } from 'react-router-dom'
import AuthManager from '../../AuthManager'
import Dashboard from './Dashboard'
import React, { Component } from 'react'
import Showcase from './Showcase'

class Home extends Component {
  render() {
    const isAuthenticated = AuthManager.isAuthenticated()
    return isAuthenticated ? (
      <Route component={Dashboard} />
    ) : (
      <Route component={Showcase} />
    )
  }
}

export default Home
