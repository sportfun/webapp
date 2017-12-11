import React from 'react'
import axios from 'axios'
import ProgressBar from './ui/progressBar'

class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.getStatsById = this.getStatsById.bind(this)
        this.calcProgress = this.calcProgress.bind(this)
        this.state = {
            stats: [],
            progress: 0,
            sportTime: 0,
            loading: true
        }
    }

    componentWillMount() {
        this.getStatsById(this, "5a0f440f8c668c63a08d0924", function (self) {
            self.calcProgress(self);
            self.setState({
                loading: false,
            })
        });
    }

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

    calcProgress(self) {
        var progress = 0;
        var goal = 5000;
        self.state.stats.forEach(function (item) {
            progress += item.time;
        });
        self.state.progress = (progress * 100) / goal;
        self.state.sportTime = progress;
    }

    render() {
        console.log(this.state.progress);
        if (this.state.loading) {
            return (false);
        } else {
            return (
                <div id="StatsPage" className="card mb-4 p-sm-3">
                    <h3>page des statistiques</h3>< br />

                    <div className="statsblock" id="ObjectiveJauge">
                        barre de progression de l'objectif
                        <ProgressBar percentage={this.state.progress} backgroundStyle="azure" /><br />
                    </div>

                    <div className="statsblock" id="GamesFav">
                        jeux favoris
                       <table className="games-fav">
                            <tbody>

                                <tr>
                                    <td><img alt="jeu1" className="GameThumbnail" src="/ressources/jeu1.jpg" /></td>
                                    <td><img alt="jeu2" className="GameThumbnail" src="/ressources/jeu2.jpg" /></td>
                                </tr>
                                <tr>
                                    <td><img alt="jeu3" className="GameThumbnail" src="/ressources/jeu3.jpg" /></td>
                                    <td><img alt="jeu4" className="GameThumbnail" src="/ressources/jeu4.jpg" /></td>
                                </tr>
                            </tbody>
                        </table><br />
                    </div>

                    <div className="statsblock" id="SportTime">
                        Temps de sport cette semaine : {Math.round(this.state.sportTime / 60)}mn
                    </div>
                </div>
            )
        }
    }
}

export default Statistics

    /*
                        <div class="statsblock" id="Games_fav">
                        Type d'effort
            <br />
                        Graphiques en barre
        </div>
        */