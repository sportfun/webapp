import React from 'react'
import { getUserByUsername } from '../../functions/getRequest';
import ApiManager from '../ApiManager'

class Administration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            loading: true
        }
    }

    componentDidMount() {
        getUserByUsername(this.context.token, localStorage.getItem('username'), (data) => {
            this.setState({ user: data });
        })
    }

    submit = e => {
        e.preventDefault();
        var infos = [
          this.refs["firstName"].value,
          this.refs["lastName"].value,
          this.refs["email"].value,
          this.refs["password"].value,
          this.refs["biography"].value,
          this.refs["goal"].value
        ];
        if (this.refs["password"].value !== this.refs["password_conf"].value) {
          alert("le mot de passe et la confirmation du mot de passe ne correspondent pas")
        }
        ApiManager.editUser(infos).then(() => {
          window.location.reload();
        }).catch(
          alert("Erreur, veuillez réessayer ultérieurement")
        )
    }

    render() {
        if (!this.state.loading) {
            return false;
        }
        else {
            return (
                <div className="pagecontainer h-100 Block card p-sm-5">
                    <h3>Administration de compte</h3><br />

                    <form onSubmit={this.submit}>
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
                            <label htmlFor="password">Confirmation mot de passe</label>
                            <input type="password" className="form-control" ref="password_conf" id="password_conf" placeholder="●●●●●●"></input>
                        </div>
                        <div className="form-group w-50">
                            <label htmlFor="biography">Biographie</label>
                            <textarea className="form-control" ref="biography" id="biography" rows="3" placeholder={this.state.user.bio} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default Administration;
