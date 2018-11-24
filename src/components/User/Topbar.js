import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import history from '../../functions/history'
import AuthManager from '../AuthManager'

import logo from '../../assets/img/logo.png'
import ApiManager from '../ApiManager';

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      pattern: '',
      username: '',
    }
  }

  componentWillMount() {
    ApiManager.getInfoUser().then((user) => {
      this.setState({ username: user.username })
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ pattern: this.refs["search_value"].value }, () => {
      history.push({
        pathname: `/users/${this.state.pattern}`,
        state: { pattern: this.state.pattern },
      });
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark" >
        <Link to='/'><img className="logo_header" src={logo} alt="logo" /></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to='/' className="nav-link">Accueil<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to={`/profile/${this.state.username}`}  test="test" className="nav-link">Profil</Link>
            </li>
            <li className="nav-item">
              <Link to={`/statistics/${this.state.username}`} className="nav-link">Statistiques</Link>
            </li>
            <li className="nav-item">
              <Link to={`/administration/${this.state.username}`} className="nav-link">Mon compte</Link>
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

export default Header
