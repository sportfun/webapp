import React from 'react'
import { Switch } from 'react-router-dom'
// User import
import Statistics from './Statistics'
import ListUsers from './Users'
import Profile from './Profile'
import SidebarLeft from './SidebarLeft'
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
import Activities from './Activities';
import CreateTraining from './Coach/CreateTraining';
import EditTraining from './Coach/EditTraining';
import TrainingList from './Coach/TrainingList';
import AuthManager from './AuthManager'
import Feed from './Feed'
import Followings from './Followings'
// import Messages from './Messages'
// local import
import PrivateRoute from './PrivateRoute'

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
                    <PrivateRoute requiredRank="authenticated" path='/coach' component={Coach} />
                    <PrivateRoute requiredRank="authenticated" path='/coachadministration' component={CoachAdmin} />
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
    else {
      return (
        <div className="wrapper-app h-100">
          <CoachHeader />
          <div className="page-container">
            <CoachSidebarLeft />
            <Switch>
              <PrivateRoute requiredRank="coach" exact path='/' component={Coach} />
              <PrivateRoute requiredRank="coach" path='/createsession' component={CreateTraining} />
              <PrivateRoute requiredRank="coach" path='/edittraining/:idtraining' component={EditTraining} />
              <PrivateRoute requiredRank="coach" path='/traininglist' component={TrainingList} />
              <PrivateRoute requiredRank="coach" path='/clientlist' component={ClientList} />
              <PrivateRoute requiredRank="coach" path='/coach/profile/:username' component={CoachProfile} />
              <PrivateRoute requiredRank="coach" path='/coachadministration' component={CoachAdmin} />
            </Switch>
          </div>
        </div>
      )
    }
  }
}

export default Main

