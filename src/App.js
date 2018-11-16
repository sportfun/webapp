import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import Login from './components/Login/Login'
import Register from './components/Register'
import Main from './components/Main'
import AuthManager from './components/AuthManager'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCoach: false,
      token: String
    }
  }

  getChildContext() {
    return {
      apiurl: "http://localhost:8080",
      token: AuthManager.getToken(),
    };
  }

  render() {
    if (!AuthManager.isAuthenticated()) {
      return (
        <div className="wrapper-app login-page">
          <div id="page-container" className="container pb-5 py-5">
            <div id="DashboardCenter" className="col-6 mr-auto ml-auto">
              <Switch>
                <PrivateRoute requiredRank="anonymous" path='/connexion' component={Login} />
                <PrivateRoute requiredRank="anonymous" path='/inscription' component={Register} />
                <Redirect to="/connexion" />
              </Switch>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <Main />
      );
    }
  }
}

App.childContextTypes = {
  apiurl: PropTypes.string,
  token: PropTypes.string,
};

export default App;
