import { Route, Switch } from 'react-router-dom'
import Activities from './Activities'
import ApiManager from '../../ApiManager'
import Friends from './Friends'
import Informations from './Informations'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Statistics from './Statistics'

class ProfileView extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    ApiManager.getUser(this.props.match.params.username)
      .then(user => {
        this.setState({
          displayedUser: user,
          loading: false,
        })
      })
      .catch(error => {
        // TODO Check si l'utilisateur existe (sinon Redirect 404)
      })
  }

  render() {
    if (this.state.loading) {
      return <p>Chargement…</p>
    }
    const { match } = this.props
    // TODO Pas passer le state.user mais celui du param
    return (
      <Switch>
        <Route
          exact
          path={match.url}
          render={props => (
            <Informations {...props} user={this.state.displayedUser} />
          )}
          user={this.state.displayedUser}
        />
        <Route
          path={`${match.url}/statistiques`}
          render={props => (
            <Statistics {...props} user={this.state.displayedUser} />
          )}
        />
        <Route
          path={`${match.url}/activites`}
          render={props => (
            <Activities {...props} user={this.state.displayedUser} />
          )}
        />
        <Route
          path={`${match.url}/amis`}
          render={props => (
            <Friends {...props} user={this.state.displayedUser} />
          )}
        />
      </Switch>
    )
  }
}

export default ProfileView
