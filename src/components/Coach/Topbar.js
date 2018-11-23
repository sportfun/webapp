import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthManager from '../AuthManager'
import logo from '../../assets/img/logo.png'

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link to='/'><img className="logo_header" src={logo} alt="logo" /></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        </div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="/" className="nav-link" onClick={AuthManager.logout}>Se déconnecter</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Header
