import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (

        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <Link to='/'><img className="logo_header" src="https://cdn.discordapp.com/attachments/250745088097910784/382220220246392832/logo_sportsfun.png" alt="logo" /></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          </div>
        </nav>
    )
  }
}

export default Header
