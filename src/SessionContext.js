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

  // TODO Juste pour tester
  growOlder = () => {
    this.setState(({ user }) => ({
      user: {
        ...user,
        age: user.age + 1,
      },
    }))
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
