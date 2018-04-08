import ApiManager from './ApiManager'
import AuthManager from './AuthManager'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const SessionContext = React.createContext()

export class SessionProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    user: {
      rank: AuthManager.getRank(),
    },
  }

  componentDidMount() {
    if (AuthManager.isAuthenticated()) {
      ApiManager.getUser().then(user => {
        this.setState({
          user: {
            ...user,
            rank: 'user',
          },
        })
      })
    }
  }

  // TODO Utiliser cette fonction dans AuthManager
  sessionChanged = user => {
    this.setState({ user: user })
  }

  render() {
    return (
      <SessionContext.Provider
        value={{
          state: this.state,
          growOlder: this.growOlder,
        }}
      >
        {this.props.children}
      </SessionContext.Provider>
    )
  }
}

export const SessionConsumer = SessionContext.Consumer
