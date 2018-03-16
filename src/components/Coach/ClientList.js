import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Main from './components/Main'
import { storeInfoUser } from './functions/getRequest'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

class ClientList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            clients: [],
        }
    }

    componentWillMount() {
        getClientList(this.state.token, () => {
            this.setState({ loading: true });
        });
    }

    render() {
        if (this.state.clients.length !== 0) {
            var listClients = this.state.clients.map((elem, index) => {
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
        }
        else {
            return (
                <td>Pas de résultat</td>
            )
        }
        return (
            <div className="container">
                <h2>Striped Rows</h2>
                <p>The .table-striped class adds zebra-stripes to a table:</p>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
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

App.childContextTypes = {
    token: PropTypes.string,
};

export default ClientList;