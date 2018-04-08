import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Navigation from '../Navigation'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Header extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  state = {
    searchValue: '',
  }

  onChange = event => {
    const value = event.target.value
    this.setState({
      searchValue: value,
    })
  }

  onSearchSubmit = () => {
    this.props.history.push(`/recherche/${this.state.searchValue}`)
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            <img
              src="images/logo_sportsfun.png"
              height="30"
              alt="Logo Sports Fun"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Navigation />
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={this.onSearchSubmit}
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Rechercher"
                aria-label="Rechercher"
                value={this.state.searchValue}
                onChange={this.onChange}
                required
              />
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Rechercher
              </button>
            </form>
          </div>
        </nav>
      </header>
    )
  }
}

export default withRouter(Header)
