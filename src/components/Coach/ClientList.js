import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { assignTraining } from '../../functions/putRequest';
import ApiManager from '../ApiManager'

class ClientList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            trainings: [],
            clients: [],
            clientsTrainings: [],
        }
    }

    componentDidMount() {
        this.loadClients();
        this.loadTrainings();
    }

    loadClients() {
        ApiManager.getUser()
            .then(user => {
                user.links.forEach(element => {
                    ApiManager.getUserById(element)
                        .then(client => {
                            this.setState({ clients: [...this.state.clients, client] });
                            ApiManager.getTrainingsByUser(client._id)
                                .then(listTrainings => {
                                    this.setState({ clientsTrainings: [...this.state.clientsTrainings, listTrainings] })
                                })
                        })
                });
            })
            .catch(error => console.error(error))
    }

    loadTrainings() {
        ApiManager.getTrainingList()
            .then((trainings) => {
                this.setState({ trainings: trainings });
            })
            .catch(error => console.error(error))
    }

    HandleTrainingChange = (index) => (e) => {
        var idTraining = this.state.trainings[e.nativeEvent.target.selectedIndex - 1]._id;
        var nameTraining = this.state.trainings[e.nativeEvent.target.selectedIndex - 1].name;
        var username = this.state.clients[index].username;
        ApiManager.addTrainingToUser(idTraining, username)
            .then(() => {
                alert("L'entrainement " + nameTraining + " a bien été assigné à " + username);
            })
            .catch((error) => {
                alert("L'entrainement " + nameTraining + " n'a pas pu être assigné à " + username + ", l'entrainement est peut-être déjà assigné à l'utilisateur, sinon veuillez réessayer ultérieurement");
            })
    }

    displayTrainings(index) {
        if (!this.state.clientsTrainings[index])
            return null
        return this.state.clientsTrainings[index].map((training) => {
            return (
                <li key={training._id} className="list-group-item">{training.name}</li>
            )
        })
    }

    render() {
        var listTrainings =
            this.state.trainings.map((training) => {
                return (
                    <option key={training._id}>{training.name}</option>
                )
            })

        // if (this.state.loading) {
        //     return (<p>Chargement…</p>)
        // }
        if (this.state.clients.length === 0) {
            return (
                <div className="pagecontainer h-100 Block card p-sm-5">
                    <h3>Vous n'avez pas encore de clients assignés</h3>
                    <p>Veuillez contacter votre administrateur pour plus d'informations</p>
                </div>
            )
        } else {
            var listClients =
                this.state.clients.map((client, index) => {
                    return (
                        <tr key={client.username}>
                            <td>{index + 1}</td>
                            <td>{client.firstName}</td>
                            <td>{client.lastName}</td>
                            <td>{client.username}</td>
                            <td>
                                <ul id="client-trainings" className="list-group list-group-flush">
                                    {this.displayTrainings(index)}
                                </ul>
                            </td>
                            <td>
                                <div className="form-group">
                                    <select defaultValue="Cliquez pour assigner un entrainement" className="form-control" id="assign" onChange={this.HandleTrainingChange(index)}>
                                        <option>Cliquez pour assigner un entrainement</option>
                                        {listTrainings}
                                    </select>
                                </div>
                            </td>
                        </tr>
                    )
                });
            return (
                <div className="pagecontainer h-100 Block card p-sm-5">
                    <h2>Liste des clients</h2>
                    <p>Détails et informations clients</p>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Nom d'utilisateur</th>
                                <th>Entrainements en cours</th>
                                <th>Assigner un entrainement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listClients}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default ClientList;