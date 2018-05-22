import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect } from 'react-router-dom'
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
import ClientList from './Coach/ClientList'
import CoachProfile from './Coach/Profile'
//
import Login from './Login'
import Register from './Register'
import Activities from './Activities';
import { getInfoUser } from '../functions/getRequest'
import CreateTraining from './Coach/CreateTraining';
import EditTraining from './Coach/EditTraining';
import TrainingList from './Coach/TrainingList';
import PrivateRoute from './PrivateRoute'
import AuthManager from './AuthManager'
import Feed from './Feed'



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
        this.setState({ isCoach: true });
      }
    });

    this.setState({ loading: true });

  }

  shouldComponentUpdate() {
    return (true);
  }

  render() {
    if (!this.state.loading) { return null }

    return (<PrivateRoute requiredRank="authenticated" path='/feed' component={Feed} />)

    if (!AuthManager.isAuthenticated()) {
      return (
        <div className="wrapper-app">
          <div id="page-container" className="container pb-5 py-6">
            <div className="row">
              <div id="DashboardCenter" className="col-6">
                <div className="DashboardCenterContent">
                  <Switch>
                    <PrivateRoute requiredRank="anonymous" path='/connexion' component={Login} />
                    <PrivateRoute requiredRank="anonymous" path='/inscription' component={Register} />
                    <Redirect to="/connexion" />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

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
                    <PrivateRoute requiredRank="authenticated" exact path='/' component={Home} />
                    <PrivateRoute requiredRank="authenticated" path='/profile/:username' component={Profile} />
                    <PrivateRoute requiredRank="authenticated" path='/users/:searchterm' component={ListUsers} />
                    <PrivateRoute requiredRank="authenticated" path='/statistics/:username' component={Statistics} />
                    <PrivateRoute requiredRank="authenticated" path='/activities/:username' component={Activities} />
                    <PrivateRoute requiredRank="authenticated" path='/administration' component={AdministrationAccount} />
                    <PrivateRoute requiredRank="authenticated" path='/coach' component={Coach} />
                    <PrivateRoute requiredRank="authenticated" path='/coachadministration' component={CoachAdmin} />
                    <PrivateRoute requiredRank="authenticated" path='/feed' component={Feed} />
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
              <PrivateRoute requiredRank="coach" exact path='/' component={Coach} />
              <PrivateRoute requiredRank="coach" path='/createsession' component={CreateTraining} />
              <PrivateRoute requiredRank="coach" path='/edittraining/:idtraining' component={EditTraining} />
              <PrivateRoute requiredRank="coach" path='/traininglist' component={TrainingList} />
              <PrivateRoute requiredRank="coach" path='/clientlist' component={ClientList} />
              <PrivateRoute requiredRank="coach" path='/coach/profile/:username' component={CoachProfile} />
              <PrivateRoute requiredRank="coach" path='/coachadministration' component={CoachAdmin} />
              <PrivateRoute requiredRank="authenticated" path='/feed' component={Feed} />
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

