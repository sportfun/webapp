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
import CoachAdmin from './Coach/CoachAdmin'
import CoachHeader from './Coach/Header'
import CoachSidebarLeft from './Coach/SidebarLeft'
//
import Login from './Login'
import Register from './Register'
import Activities from './Activities';
import { getInfoUser } from '../functions/getRequest'
import CreateSession from './Coach/CreateSession';



// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTg1ZmY5ZWE1YWQxMzE1NmFkMzMyMDYiLCJpYXQiOjE1MTg3MzIxMzB9.acd4c0f6_IiJck7xpQXiZZXaVEvRwIcBvQ28rEggr2k",
      isCoach: false
    }
  }

  componentWillMount() {
    getInfoUser(this.state.token, (data) => {
      if (data.roles[0] === "coach") {
        this.setState({ isCoach: false });
      }
    });

   this.setState({ loading: true });

  }

  shouldComponentUpdate() {
    return (true);
  }

  render() {
    if (!this.state.loading) { return null }
    if (!this.state.isCoach) {

      return (
        <div className="wrapper-app">
          <Header />
          <div id="page-container" className="container pb-5 py-6">
            <div className="row">

              <SidebarLeft state="test" />

              <div id="DashboardCenter" className="col-6">
                <div className="DashboardCenterContent">
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/profile/:username' state="test" component={Profile} />
                    <Route path='/users/:searchterm' component={ListUsers} />
                    <Route path='/statistics/:username' component={Statistics} />
                    <Route path='/activities/:username' component={Activities} />
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
      if (window.location.href !== 'http://localhost:3000/')
        sidebar = <CoachSidebarLeft />;
      return (
        <div className="wrapper-app h-100">
          <CoachHeader />
          <div className="page-container">
            {sidebar}
            <Switch>
              <Route exact path='/' component={Coach} />
              <Route path='/createsession' component={CreateSession} />
              <Route path='/profile' component={Profile} />
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
  getUserInfo: PropTypes.func,
  isCoach: PropTypes.bool
};

export default Main

