import React from 'react'
import { Switch } from 'react-router-dom'

import Coach from './Coach'
import CoachAdmin from './CoachAdmin'
import PrivateRoute from '../PrivateRoute'
import CoachHeader from './Header'
import CoachSidebarLeft from './SidebarLeft'
import ClientList from './ClientList'
import CoachProfile from './Profile'

import CreateTraining from './CreateTraining';
import EditTraining from './EditTraining';
import TrainingList from './TrainingList';
import SidebarLeft from '../SidebarLeft';

class RouterCoach extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return (
      <div className="wrapper-app h-100">
        <CoachHeader />
        <CoachSidebarLeft />
        <div className="page-container">
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
    );
  }
}

export default RouterCoach