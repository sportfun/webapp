import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../../components/PrivateRoute'
import ProfileEdit from './ProfileEdit'
import ProfileView from './ProfileView'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Profile extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props
    return (
      <Switch>
        <PrivateRoute
          exact
          requiredRank="authenticated"
          path={match.url}
          component={ProfileEdit}
        />
        <Route path={`${match.url}/:username`} component={ProfileView} />
      </Switch>
    )
  }
}

export default Profile
