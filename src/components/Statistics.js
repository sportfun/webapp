import React from 'react'
import axios from 'axios'
import ProgressBar from './ui/progressBar'
import PropTypes from 'prop-types'


class Statistics extends React.Component {
    constructor(props) {
        super(props)
        //   this.getStatsById = this.getStatsById.bind(this)
        this.calcProgress = this.calcProgress.bind(this)
        this.state = {
            stats: [],
            goalPercent: 0,
            goal: 5000,
            sportTime: 0,
            loading: true
        }
    }

    componentWillMount() {
        this.calcProgress();
        /*
        this.getStatsById(this, "5a0f440f8c668c63a08d0924", function (self) {
            self.calcProgress(self);
            self.setState({
                loading: false,
            })
        });
        */
    }
    /*
        getStatsById = (self, username, callback) => {
            axios.get('http://149.202.41.22:8080/api/activities')
                .then(response => {
                    self.setState({
                        stats: response.data,
                    })
                    callback(self);
                })
                .catch((error) => {
                    console.log("error", error)
                })
        }
    */
    calcProgress() {
        var sportTime = 2500;
        var goal = 5000;
        /*

this.state.stats.forEach(function (item) {
    sportTime += item.time;
});
self.state.stats.forEach(function (item) {
    progress += item.time;
});
self.state.progress = (progress * 100) / goal;
self.state.sportTime = progress;
*/
        this.setState({ goalPercent: (sportTime * 100) / goal });
        this.setState({ sportTime: sportTime });
    }

    render() {
        console.log(this.state.goalPercent);
        //if (this.state.loading) {
        //    return (false);
        //} else {
        return (
            <div id="StatsPage" className="card mb-4 p-sm-3">
                <h3>Vos statistiques</h3>< br />

                <table className="w-100">
                    <tbody>

                        <tr>
                            <td className="w-50">
                                <div className="statsblock center p-4 m-4" id="ObjectiveJauge">
                                    <div className="display-4 text-info">{this.state.sportTime}</div><br />
                                    <div className="statdescri">minutes d'effort cette semaine !</div>
                                </div>
                            </td>
                            <td className="w-50">

                                <div className="statsblock center p-4 m-4" id="ObjectiveJauge">
                                    <div className="display-4 text-info">{this.state.goal}</div>
                                    <span className="statdescri">objectif de la semaine</span>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="statsblock p-4 m-4" id="ObjectiveJauge">
                    <div className="statdescri">Objectif rempli à</div>
                    <ProgressBar percentage={this.state.goalPercent} backgroundStyle="azure" />
                </div>

                <div className="statsblock center p-4 m-4" id="GamesFav">
                    <span className="statdescri">jeux les plus joués</span>
                    <table className="w-100 mt-4">
                        <tbody>
                            <tr className="w-100">

                                <td className="w-50">
                                    <div className="card border-info text-center m-3">
                                        <div className="card-header">
                                            <img className="statimg card-img-top rounded mx-auto d-block" src="/ressources/jeu1.jpg" alt="Card" />
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text text-info">Jeu1 example</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="w-50">
                                    <div className="card border-info text-center m-3">
                                        <div className="card-header">
                                            <img className="statimg card-img-top rounded mx-auto d-block" src="/ressources/jeu2.jpg" alt="Card" />
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text text-info">Jeu1 example</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="w-100">

                                <td className="w-50">
                                    <div className="card border-info text-center m-3">
                                        <div className="card-header">
                                            <img className="statimg card-img-top rounded mx-auto d-block" src="/ressources/jeu3.jpg" alt="Card" />
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text text-info">Jeu1 example</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="w-50">
                                    <div className="card border-info text-center m-3">
                                        <div className="card-header">
                                            <img className="statimg card-img-top rounded mx-auto d-block" src="/ressources/jeu4.jpg" alt="Card" />
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text text-info">Jeu1 example</p>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
        //}
    }
}

Statistics.contextTypes = {
    apiurl: PropTypes.string,
    token: PropTypes.string,
};

export default Statistics

                /*
                <div className="statsblock p-4 m-4" id="SportTime">
                    Temps de sport cette semaine : {Math.round(this.state.sportTime / 60)}h
                    </div>

                        <div class="statsblock" id="Games_fav">
                    Type d'effort
            <br />
                    Graphiques en barre
        </div>
                */