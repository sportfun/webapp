import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Statistics from './Statistics'
import ListUsers from './Users'
import Profile from './Profile'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import Header from './Header'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component {
  /*
  constructor(props) {
    super(props)
  }
  */

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <Header myuser={this.props.user}/>
        <div id="page-container" className="container pb-5 py-6">
          <div className="row">
            <SidebarLeft myuser={this.props.user} />

            <div id="DashboardCenter" className="col-6">
              <div className="DashboardCenterContent">
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/profile/:username' component={Profile}/>
                  <Route path='/users' component={ListUsers} />
                  <Route path='/statistics/:username' component={Statistics} />
                </Switch>
              </div>
            </div>

            <SidebarRight />
          </div>
        </div>
      </div>
    )
  }
}

export default Main