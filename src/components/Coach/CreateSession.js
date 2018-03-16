import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { getUserById, getFriends } from '../../functions/getRequest';

class CreateSession extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: {},
            loading: true
        }
    }

    componentWillMount() {
        getFriends(this.context.token, (data) => {
            this.setState({ clients: data });
        })
    }

    submit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://149.202.41.22:8080/api/user/edit/info',
            data: {
                firstName: this.refs["firstName"].value,
                lastName: this.refs["lastName"].value,
                email: this.refs["email"].value,
                password: this.refs["password"].value,
                bio: this.refs["biography"].value
            },
            headers: { "token": this.context.token }
        }).then(response => {
            window.location.reload();
            console.log(response);
        }).catch(error => {
            console.log(error.response)
        })
    }

    render() {

        var listClients = this.state.clients.map((elem, index) => {
            return (
                <option>{elem.username}</option>
            );
        });

        if (!this.state.loading) {
            return false;
        }
        else {
            return (
                <div className="pagecontainer h-100 Block card p-sm-5">
                    <h3>Création de séance sportive</h3><br />

                    <form onSubmit={this.submit}>
                        <label for="sel1">Select list:</label>
                        <select class="form-control" id="sel1">
                            {listClients}
                        </select>

                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Sprint</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Endurance</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Fractionné</a>
                            </li>
                        </ul>

                        <div className="form-group w-50">
                            <label htmlFor="firstName">Prénom</label>
                            <input type="text" className="form-control" ref="firstName" id="firstName" placeholder={this.state.user.firstName}></input>
                        </div>
                        <div className="form-group w-50">
                            <label htmlFor="lastName">Nom</label>
                            <input type="text" className="form-control" ref="lastName" id="lastName" placeholder={this.state.user.lastName}></input>
                        </div>
                        <div className="form-group w-50">
                            <label htmlFor="email">Adresse mail</label>
                            <input type="text" className="form-control" ref="email" id="email" aria-describedby="emailHelp" placeholder={this.state.user.email}></input>
                        </div>
                        <div className="form-group w-50">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" className="form-control" ref="password" id="password" placeholder="●●●●●●"></input>
                        </div>
                        <div className="form-group w-50">
                            <label htmlFor="biography">Biographie</label>
                            <textarea className="form-control" ref="biography" id="biography" rows="3" defaultValue={this.state.user.bio} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            )
        }
    }
}

CreateSession.contextTypes = {
    apiurl: PropTypes.string,
    token: PropTypes.string,
    getUserInfo: PropTypes.func
};

export default CreateSession;