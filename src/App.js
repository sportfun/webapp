import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Main from './components/Main'
import {storeInfoUser} from './functions/basics'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTg1ZmY5ZWE1YWQxMzE1NmFkMzMyMDYiLCJpYXQiOjE1MTg3MzIxMzB9.acd4c0f6_IiJck7xpQXiZZXaVEvRwIcBvQ28rEggr2k"
    }
  }

  getChildContext() {
    return {
      orangecolor: "rgb(245, 184, 154)",
      apiurl: "http://149.202.41.22:8080",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTg1ZmY5ZWE1YWQxMzE1NmFkMzMyMDYiLCJpYXQiOjE1MTg3MzIxMzB9.acd4c0f6_IiJck7xpQXiZZXaVEvRwIcBvQ28rEggr2k",
      getUserInfo : require('./functions/basics').getInfoUser
    };
  }

  componentWillMount() {
    storeInfoUser(this.state.token,() => {
      this.setState({loading: true});
    });
  }

  render() {
    if(!this.state.loading){return null}
    return (
        <Main />
    );
  }
}

App.childContextTypes = {
  orangecolor: PropTypes.string,
  apiurl: PropTypes.string,
  token: PropTypes.string,
  getUserInfo: PropTypes.func
};

export default App;
