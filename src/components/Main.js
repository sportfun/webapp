import React from 'react'
import AuthManager from './AuthManager'
import CoachRouter from './Coach/CoachRouter'
import UserRouter from './User/UserRouter';

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isCoach: false
    }
  }

  componentWillMount() {
    this.checkRole()
  }

  checkRole() {
    AuthManager.isCoach()
      .then(isCoach => {
        this.setState({
          isCoach: isCoach,
          loading: false,
        })
      })
  }

  render() {
    if (this.state.loading) { return null }
    if (!this.state.isCoach) {
      return (
        <UserRouter />
      )
    } else {
      return (
        <CoachRouter />
      )
    }
  }
}

export default Main

