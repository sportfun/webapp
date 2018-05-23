import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { getTrainingList } from '../../functions/getRequest';
import { assignTraining } from '../../functions/putRequest';

class ClientList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            clients: [],
            trainings: []
        }
    }

    componentWillMount() {
        getTrainingList(this.context.token, localStorage.getItem('username'), (data) => {
            this.setState({ trainings: data });
            this.setState({ loading: true });
        })
        this.setState({
            clients: [
                {
                    "username": "test1",
                    "email": "test1@test.com",
                    "firstName": "Test",
                    "lastName": "One",
                },
                {
                    "username": "test2",
                    "email": "test2@test.com",
                    "firstName": "Test",
                    "lastName": "Two",
                },
                {
                    "username": "test5",
                    "email": "test5@test.com",
                    "firstName": "test",
                    "lastName": "cinq",
                },
            ]
        });

        /*
        getClientList(this.state.token, () => {
            this.setState({ loading: true });
        });
        */
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

        if (this.state.clients.length !== 0) {

            var listClients =
                this.state.clients.map((elem, index) => {
                    return (
                        //  <Link to={`/profile/${elem.username}`} key={elem._id}>                             <td><img className="rounded-avatar" alt='profilePicture-item' src={this.context.apiurl + elem.profilePic} /></td>
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{elem.firstName}</td>
                            <td>{elem.lastName}</td>
                            <td>{elem.email}</td>
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