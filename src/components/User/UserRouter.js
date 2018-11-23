import React from 'react'
import PrivateRoute from '../PrivateRoute'
import { Switch } from 'react-router-dom'
import Statistics from './Statistics'
import ListUsers from './Users'
import Profile from './Profile'
import SidebarLeft from './SidebarLeft'
import Header from './Header'
import AdministrationAccount from './AdministrationAccount'

import Activities from './Activities';
import Feed from './Feed'
import Followings from './Followings'

class UserRouter extends React.Component {
    render() {
        return (
            <div className="wrapper-app">
            <Header />
            <div id="page-container" className="container pb-5 py-5">
              <div className="row">
                <SidebarLeft state="test" />
  
                <div id="DashboardCenter" className="col-6">
                  <div className="DashboardCenterContent">
                    <Switch>
                      <PrivateRoute requiredRank="authenticated" exact path='/' component={Feed} />
                      <PrivateRoute requiredRank="authenticated" path='/profile/:username' component={Profile} />
                      <PrivateRoute requiredRank="authenticated" path='/users/:searchterm' component={ListUsers} />
                      <PrivateRoute requiredRank="authenticated" path='/statistics/:username' component={Statistics} />
                      <PrivateRoute requiredRank="authenticated" path='/activities/:username' component={Activities} />
                      <PrivateRoute requiredRank="authenticated" path='/administration' component={AdministrationAccount} />
                      <PrivateRoute requiredRank="authenticated" path='/abonnements' component={Followings} />
                      {/* <PrivateRoute requiredRank="authenticated" path='/messages' component={Messages} /> */}
                    </Switch>
                  </div>
                </div>
  
                {
                  /*
                  <SidebarRight />
                   */
                }
              </div>
            </div>
          </div>
        )
    }
}

export default UserRouter

