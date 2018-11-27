import React from 'react'
import ApiManager from '../ApiManager'
import Avatar from '../Avatar'
import md5 from 'md5'

class Administration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            loading: true
        }
    }

    componentDidMount() {
        ApiManager.getUser().then(user => {
            this.setState({ user: user })
        })
    }

    submit = e => {
        e.preventDefault();
        let profilepic = this.refs["profilePic"].value
        if (profilepic !== ""){
            let hash = md5(this.refs["profilePic"].value.trim().toLowerCase());
            profilepic = "https://www.gravatar.com/avatar/" + hash;
        }
        var infos = [
            this.refs["firstName"].value,
            this.refs["lastName"].value,
            this.refs["email"].value,
            this.refs["password"].value,
            this.refs["biography"].value,
            "",
            profilepic,
        ];
        if (this.refs["password"].value !== this.refs["password_conf"].value) {
            alert("le mot de passe et la confirmation du mot de passe ne correspondent pas")
        }
        ApiManager.editUser(infos)
        .then(() => {
            window.location.reload();
        }).catch(() => {
            alert("Erreur, veuillez réessayer ultérieurement")

        })
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
                            <label htmlFor="profilePic" className="pr-3">Avatar</label>
                            <Avatar isLittle={true} profilepic={this.state.user.profilePic} />
                            <div className="input-group pt-2">
                                <input type="text" className="form-control" ref="profilePic" id="profilepic" placeholder="Entrez votre adresse mail gravatar"></input>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-success" type="button" data-toggle="collapse" data-target="#HowToGravatar" aria-expanded="false" aria-controls="HowToGravatar">?</button>
                                </div>
                            </div>
                            <div className="collapse" id="HowToGravatar">
                                <div className="m-3 card card-body">
                                    SportsFun utilise Gravatar pour votre photo de profil !<br /><br />

                                    Comment changer ma photo de profil ?<br />
                                    1 - Connectez-vous sur gravatar.com ou créez un compte si vous ne possédez pas d'identifiants Gravatar<br />
                                    2 - Cliquez sur Ajouter une image et suivez les instructions<br />
                                    3 - Renseignez votre adresse email Gravatar dans le champ ci-dessus pour lier votre avatar à SportsFun !<br />
                                </div>
                            </div>
                        </div>

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
