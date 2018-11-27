import React from 'react'
import PrivateRoute from '../PrivateRoute'
import { Switch } from 'react-router-dom'

import Home from './Home'
import Administration from './Administration'
import Topbar from './Topbar'
import ClientList from './ClientList'
import Profile from './Profile'
import CreateTraining from './CreateTraining';
import EditTraining from './EditTraining';
import TrainingList from './TrainingList';
import SidebarLeft from './SidebarLeft';

class CoachRouter extends React.Component {
    render() {
        return (
            <div className="wrapper-app h-100">
                <Topbar />
                <div className="page-container h-100">
                    <SidebarLeft />
                    <Switch>
                        <PrivateRoute requiredRank="coach" exact path='/' component={Home} />
                        <PrivateRoute requiredRank="coach" path='/createsession' component={CreateTraining} />
                        <PrivateRoute requiredRank="coach" path='/edittraining/:idtraining' component={EditTraining} />
                        <PrivateRoute requiredRank="coach" path='/traininglist' component={TrainingList} />
                        <PrivateRoute requiredRank="coach" path='/clientlist' component={ClientList} />
                        <PrivateRoute requiredRank="coach" path='/profile' component={Profile} />
                        <PrivateRoute requiredRank="coach" path='/account' component={Administration} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default CoachRouter

