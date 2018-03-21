import './App.css'
import { Route, Switch } from 'react-router-dom'
import ErrorPage from './containers/ErrorPage'
import Home from './containers/Home'
import Layout from './components/Layout'
import Login from './containers/Login'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Profile from './containers/Profile'
import React, { Component } from 'react'
import Registration from './containers/Registration'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            requiredRank="authenticated"
            path="/profil"
            component={Profile}
          />
          <PrivateRoute
            requiredRank="anonymous"
            path="/inscription"
            component={Registration}
          />
          <PrivateRoute
            requiredRank="anonymous"
            path="/connexion"
            component={Login}
          />
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    )
  }
}

export default App
