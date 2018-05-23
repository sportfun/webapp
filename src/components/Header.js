import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import history from '../functions/history'
import PropTypes from 'prop-types'
import AuthManager from './AuthManager'

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      searchTerm: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ searchTerm: this.refs["search_value"].value }, () => {
      history.push({
        pathname: `/users/${this.state.searchTerm}`,
        state: { searchTerm: this.state.searchTerm },
      });
    });
  }

  render() {
    let username = localStorage.getItem('username');

    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" >
        <Link to='/'><img className="logo_header" src={this.context.apiurl + "/static/logo_sportsfun.png"} alt="logo" /></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to='/' className="nav-link">Accueil<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to={`/profile/${username}`} className="nav-link">Profil</Link>
            </li>
            <li className="nav-item">
              <Link to={`/statistics/${username}`} className="nav-link">Statistiques</Link>
            </li>
            <li className="nav-item">
              <Link to={`/administration/${username}`} className="nav-link">Mon compte</Link>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={AuthManager.logout}>Se déconnecter</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 w-25" onSubmit={this.handleSubmit}>
            <input ref="search_value" name="search_value" className="form-control mr-sm-2 w-65" type="text" placeholder="Entrez un nom d'utilisateur" aria-label="Rechercher" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Rechercher</button>
          </form>
        </div>
      </nav>
    )
  }
}

Header.contextTypes = {
  apiurl: PropTypes.string,
};

export default Header
