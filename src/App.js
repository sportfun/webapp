import React, { Component } from 'react';
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import exUser from './functions/exUser'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: []
    }
  }

  componentWillMount() {
    this.setState({
      user: exUser,
    })
  }

  render() {
    return (
      <div>
        <Main user={this.state.user}/>
      </div>
    );
  }
}

export default App;
