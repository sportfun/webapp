import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Main from './components/Main'
import { storeInfoUser } from './functions/getRequest'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css'
import AuthManager from './components/AuthManager'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      token: AuthManager.getToken(),
      isCoach: false
    }
  }

  getChildContext() {
    return {
      orangecolor: "rgb(245, 184, 154)",
      apiurl: "http://149.202.41.22:8080",
      token: AuthManager.getToken(),
      getUserInfo: require('./functions/getRequest').getInfoUser,
    };
  }

  componentWillMount() {
    storeInfoUser(this.state.token, () => {
      this.setState({ loading: true });
    });
  }

  render() {
    if (!this.state.loading) { return null }
    //Session a implémenter ici + envoyer le token dans le main
    return (
      <Main />
    );
  }
}

App.childContextTypes = {
  orangecolor: PropTypes.string,
  apiurl: PropTypes.string,
  token: PropTypes.string,
  id: PropTypes.string,
  getUserInfo: PropTypes.func,
};

export default App;
