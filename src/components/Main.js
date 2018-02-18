import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
// User import
import Home from './Home'
import Statistics from './Statistics'
import ListUsers from './Users'
import Profile from './Profile'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import Header from './Header'
import AdministrationAccount from './AdministrationAccount'
// Coach import
import Coach from './Coach/Coach'
import CoachAdmin from './Coach/AdminAccount'
import CoachHeader from './Coach/Header'
import CoachSidebarLeft from './Coach/SidebarLeft'

import Login from './Login'
import Register from './Register'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component {

  componentWillMount() {
  }

  render() {
    var i = 1;

    if (i === 1) {

      return (
        <div className="wrapper-app">
          <Header />
          <div id="page-container" className="container pb-5 py-6">
            <div className="row">

              <SidebarLeft />

              <div id="DashboardCenter" className="col-6">
                <div className="DashboardCenterContent">
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/profile/:username' state="test" component={Profile} />
                    <Route path='/users/:searchterm' component={ListUsers} />
                    <Route path='/statistics/:username' component={Statistics} />
                    <Route path='/administration' component={AdministrationAccount} />
                    <Route path='/coach' component={Coach} />
                    <Route path='/coachadministration' component={CoachAdmin} />
                  </Switch>
                </div>
              </div>

              <SidebarRight />

            </div>
          </div>
        </div>
      )
    }
    else {
      let sidebar = null;
      console.log(window.location.href);
      if (window.location.href !== 'http://localhost:3000/')
        sidebar = <CoachSidebarLeft />;
      return (
        <div className="wrapper-app h-100">
          <CoachHeader />
          <div className="page-container">
            {sidebar}
            <Switch>
              <Route exact path='/' component={Coach} />
              <Route path='/coachadministration' component={CoachAdmin} />
              <Route path='/connexion' component={Login} />
              <Route path='/inscription' component={Register} />
            </Switch>
          </div>
        </div>
      )
    }
  }
}

Main.contextTypes = {
  apiurl: PropTypes.string,
  token: PropTypes.string,
  getUserInfo: PropTypes.func
};

export default Main

