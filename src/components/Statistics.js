import React from 'react'
import axios from 'axios'
import ProgressBar from './ui/progressBar'

class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.getStatsById = this.getStatsById.bind(this),
        this.calcProgress = this.calcProgress.bind(this),        
        this.state = {
            stats: []
        }
    }

    componentWillMount() {
        this.getStatsById(this, "5a0f440f8c668c63a08d0924", function(){
            calcProgress(this)
        });
    }

    getStatsById = (self, username, callback) => {
        axios.get('http://149.202.41.22:8080/api/activities')
            .then(response => {
                self.setState({
                    stats: response.data,
                })
                callback();
                console.log(self.state.stats);
            })
            .catch((error) => {
                console.log("error", error)
            })
        }

    calcProgress(self) {
        console.log(self.state.stats)
      /*  self.state.stats.forEach(function (item) {
           console.log(item); 
        });*/
    }

    render() {
        return (
            <div id="StatsPage" className="card mb-4 p-sm-3">
                <h3>page des statistiques</h3>< br />

                <div class="StatsBlock" id="Objective_jauge">
                    barre de progression de l'objectif
                    <ProgressBar percentage="30" backgroundStyle="azure"/>
                    <ProgressBar percentage="50" backgroundStyle="violet"/>
                </div>


                <div class="StatsBlock" id="Games_fav">

                    jeux favoris
        <table>
                        <tr>
                            <td><img alt="jeu1" class="GameThumbnail" src="ressources/jeu1.jpg" /></td>
                            <td><img alt="jeu1" class="GameThumbnail" src="ressources/jeu2.jpg" /></td>
                        </tr>
                        <tr>
                            <td><img alt="jeu1" class="GameThumbnail" src="ressources/jeu3.jpg" /></td>
                            <td><img alt="jeu1" class="GameThumbnail" src="ressources/jeu4.jpg" /></td>
                        </tr>
                    </table>
                </div>

                <div class="StatsBlock" id="Games_fav">
                    Temps de sport cette semaine
            <input type="text" value="75" class="dial"></input>
                    {/*
            <script>    $(function() {
                             $(".dial").knob();
                        });
                    </script>*/}

                </div>

                <div class="StatsBlock" id="Games_fav">
                    Type d'effort
            <br />
                    Graphiques en barre
        </div>
            </div>
        )
    }
}

export default Statistics