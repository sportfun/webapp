import React from 'react'
import PropTypes from 'prop-types'
import { getActivityUser } from '../../functions/getRequest'

class Activities extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activities: [],
            loading: false,
        }
    }

    componentWillMount() {
        getActivityUser(this.context.token, (data) => {
            this.setState({ activities: data });
            this.setState({ loading: true });
        });
    }

    render() {
        if (!this.state.loading) { return null }
        if (this.state.activities.length !== 0) {

            var activities = this.state.activities;
            return (
                <div id="ActivitiesPage" className="card mb-4 p-sm-3">
                    <h3>Vous avez joué à...</h3>
                    {activities.map(function (elem, index) {
                        var date = new Date(elem.date);
                        return (
                            <div className="card m-4" key={index}>
                                <div className="card-header">
                                    <span className="mx-5">Jeu exemple</span>
                                </div>
                                <div className="card-block align">
                                    <img className="card-img-top rounded-circle wp-100 hp-100 my-3 mx-5 d-block" src="/ressources/jeu1.jpg" alt="Card" />
                                    <div className="">
                                        type d'effort : 
                                        {elem.type} <br />
                                        le {date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()}<br />

                                        pendant {elem.timeSpent} minute(s)<br />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
        else {
            return (
                <div id="ActivitiesPage" className="card mb-4 p-sm-3">
                    <h3>Vous n'avez pas encore joué à sportsFun !</h3>

                </div>
            )
        }
    }
}

Activities.contextTypes = {
    token: PropTypes.string,
};

export default Activities