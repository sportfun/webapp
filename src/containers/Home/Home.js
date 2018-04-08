import { Route } from 'react-router-dom'
import { SessionConsumer } from '../../SessionContext'
import Dashboard from './Dashboard'
import NewsFeed from './NewsFeed'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Showcase from './Showcase'

class Home extends Component {
  static propTypes = {
    userRank: PropTypes.string.isRequired,
  }

  render() {
    switch (this.props.userRank) {
      case 'coach':
        return <Route component={Dashboard} />
      case 'user':
        return <Route component={NewsFeed} />
      default:
        return <Route component={Showcase} />
    }
  }
}

// TODO displayName ?
// eslint-disable-next-line react/display-name
export default props => (
  <SessionConsumer>
    {context => <Home {...props} userRank={context.state.user.rank} />}
  </SessionConsumer>
)
