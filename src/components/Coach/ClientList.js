import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

class ClientList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            clients: [],
        }
    }

    componentWillMount() {
        /*
        getClientList(this.state.token, () => {
            this.setState({ loading: true });
        });
        */
    }

    render() {
        if (this.state.clients.length === 0) {

            var listClients =
                <tr>
                    <td>1</td>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                    <td><img className="rounded-avatar" alt='profilePicture-item' /></td>
                </tr>
            /*
            = this.state.clients.map((elem, index) => {
                return (
                    <Link to={`/profile/${elem.username}`} key={elem._id}>
                        <tr>
                            <td><img className="rounded-avatar" alt='profilePicture-item' src={this.context.apiurl + elem.profilePic} /></td>
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                        </tr>
                    </Link>
                    
                );
            });
            */
        }
        else {
            return (
                <div>Pas de résultat</div>
            )
        }
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
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Document</th>
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

export default ClientList;