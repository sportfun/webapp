import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { getAssignTrainings, getTrainingListByToken } from '../../functions/getRequest';
import { assignTraining } from '../../functions/putRequest';

class ClientList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            clients: [],
            trainings: [],
            trclient: [],
        }
    }

    componentWillMount() {
        getTrainingListByToken(this.context.token, (data) => {
            this.setState({ trainings: data });
            this.setState({ loading: true });
        })
        /* Promise
        getTrainingListByToken(this.context.token).then((data) => {
            this.setState({ trainings: data });
            this.setState({ loading: true });
        })
        */
        const clients = [
            {
                "id": "5a8d68dde8db887e4d35350b",
                "username": "test1",
                "email": "test1@test.com",
                "firstName": "Test",
                "lastName": "One",
            },
            {
                "id": "5a8d68f3e8db887e4d35350c",
                "username": "test2",
                "email": "test2@test.com",
                "firstName": "Test",
                "lastName": "Two",
            },
            {
                "id": "5a8d75b0e8db887e4d353515",
                "username": "test5",
                "email": "test5@test.com",
                "firstName": "test",
                "lastName": "cinq",
            },
        ]

        this.setState({ clients: clients });

        /*
                this.clientTrainings = []
                clients.forEach(({ id }) => {
                    getAssignTrainings(this.state.token, id).then(myData => {
                        var toto = []
                        myData.map((elem, index) => {
                            toto.push(elem.name);
                        })
                        this.clientTrainings.push(toto)
                    })
                })
                */
        this.clientTrainings = []
        const promises = []
        clients.forEach(elem => {
            promises.push(getAssignTrainings(this.state.token, elem.id))
        })

        Promise.all(promises).then(data => {
            console.log(data);
            this.setState({ trclient: data });
        })
    }

    HandleTrainingChange = (index) => (e) => {
        var idTraining = this.state.trainings[e.nativeEvent.target.selectedIndex]._id;
        var nameTraining = this.state.trainings[e.nativeEvent.target.selectedIndex].name;
        var username = this.state.clients[index].username;
        assignTraining(this.context.token, username, idTraining, () => {
            alert("L'entrainement " + nameTraining + " a bien été assigné à " + username);
        })
    }


    handleChange = (index) => (e) => {
        const newSequences = this.state.sequences.map((sequence, sindex) => {
            if (index !== sindex)
                return sequence;
            sequence[e.target.name] = e.target.value;
            if (sequence.type === 3)
                sequence["totalLength"] = (Number(sequence.effortLength) + Number(sequence.restLength)) * Number(sequence.iteration);
            return { ...sequence };
        });
        this.setState({ sequences: newSequences });
    }

    render() {

        if (this.state.trainings.length !== 0) {
            var listTrainings =
                this.state.trainings.map((elem, index) => {
                    return (
                        <option key={index}>{elem.name}</option>
                    );
                });
        }
        /*
                var userTrainings =
                    this.state.clients.map((elem, index) => {
                        getListTrainingsById(this.state.token, elem.id, (data) => {
                            console.log("test : " + data);
                            return (
                                <li>
                                    {data}
                                </li>
                            );
                        })
                    })
                    */

        if (this.state.clients.length !== 0) {

            var listClients =
                this.state.clients.map((elem, index) => {
                    console.log(index + " : " + this.state.trclient[index])
                    if (this.state.trclient.length !== 0) {
                        var tutu = []
                        this.state.trclient[index].map((elem) => {
                            tutu.push(elem.name)
                            console.log(elem.name)
                        })
                    }

                    if (tutu) {
                        console.log(tutu)
                    if (tutu.length !== 0) {
                        var list =
                            tutu.map((elem, index) => {
                                return (
                                    <li class="list-group-item">
                                        {elem}
                                    </li>
                                );
                            });
                    }
                }

                    /*
                    var test =
                        getListTrainingsById(elem.token, elem.id, (data) => {
                        })
                        console.log("YO : " +  test);
                        */
                    return (
                        /* Ajouter liste trainings
                                                    <td>
                                <ul className="list-group">
                                    {getListTrainingsById(this.state.token, elem.id, (data) => {
                                        console.log("data = " + data);
                                        return (
                                            <li class="list-group-item">
                                                {data}
                                            </li>
                                        );
                                    })}
                                </ul>
        
                            </td>

                                                            
                                 {
                                    this.clientTrainings.map((elem, index) => {
                                        console.log(index)
                                    })
                                }


                                                        {
                            this.state.trclient[index].forEach(elem => {
                                return (
                                    <li>
                                        {elem}
                                    </li>
                                )
                            })
                            }

                            */
                        //                           {this.clientTrainings}

                        /*
                                                            {
                                        tutu.forEach(function(elem) {
                                        return (
                                            <li>
                                              {elem}
                                            </li>
                                        )
                                    })
                                    }
                                    */


                        //  <Link to={`/profile/${elem.username}`} key={elem._id}>                             <td><img className="rounded-avatar" alt='profilePicture-item' src={this.context.apiurl + elem.profilePic} /></td>
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{elem.firstName}</td>
                            <td>{elem.lastName}</td>
                            <td>{elem.email}</td>
                            <td>
                                <ul className="list-group">
                                    {list}
                                </ul>

                            </td>
                            <td>
                                <div className="form-group">
                                    <select className="form-control" id="sel" onChange={this.HandleTrainingChange(index)}>
                                        {listTrainings}
                                    </select>
                                </div>
                            </td>
                        </tr>
                        //</Link>
                    );
                });
            /*
                <tr>
                    <td>1</td>
                    <td><img className="rounded-avatar" alt='profilePicture-item' /></td>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                   
                    <td>
                        <div className="form-group">
                            <select className="form-control" id="sel1" onChange={this.HandleTrainingChange()}>
                                {listTrainings}
                            </select>
                        </div>
                    </td>
        
                </tr>
            */
        }
        else {
            return (
                <div>Pas de résultat</div>
            )
        }
        return (
            // <th>Photo</th>
            //                            <th>Entrainements en cours</th>

            <div className="pagecontainer h-100 Block card p-sm-5">
                <h2>Liste des clients</h2>
                <p>Détails et informations clients</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Entrainements en cours</th>
                            <th>Assigner un entrainement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listClients}
                    </tbody>
                </table>
            </div>
        );
    }
}

ClientList.contextTypes = {
    apiurl: PropTypes.string,
    token: PropTypes.string,
};

export default ClientList;