import React from 'react'
import ApiManager from '../ApiManager'
import Avatar from '../Avatar'
import md5 from 'md5'

const orange = "#FF7F41"

class AdministrationAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      loading: true,
    }
  }

  componentWillMount() {
    ApiManager.getUser().then((user) => {
      this.setState({ user: user });
      this.setState({ loading: false });
    });
  }

  submit = e => {
    e.preventDefault();
    let hash = md5(this.refs["profilePic"].value.trim().toLowerCase());
    let urlPic = "https://www.gravatar.com/avatar/" + hash
    var infos = [
      this.refs["firstName"].value,
      this.refs["lastName"].value,
      this.refs["email"].value,
      this.refs["password"].value,
      this.refs["biography"].value,
      this.refs["goal"].value,
      urlPic,
    ];
    if (this.refs["password"].value !== this.refs["password_conf"].value) {
      alert("le mot de passe et la confirmation du mot de passe ne correspondent pas")
    }
    ApiManager.editUser(infos)
    .then(() => {
      window.location.reload();
    })
    .catch(() => {
      alert("Erreur, veuillez réessayer ultérieurement")
    })
  }

  render() {
    if (this.state.loading) { return null }

    let coords = { x1: 0, y1: 0, x2: 550, y2: 0 };

    return (
      <div id="AdministrationAccount" className="card mb-4">
        <div className="card">
          <div className="info-user p-sm-3">
            <h2> Paramètres du compte </h2>

            <form onSubmit={this.submit} >

              <div className="row pt-4 my-1">
              <label htmlFor="profilePic" className="col-sm-3 col-form-label">Avatar</label>
              <Avatar isLittle={true} profilepic={this.state.user.profilePic} />
                <div className="input-group col-sm-8">
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
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={orange} strokeWidth={2} /></svg>

              <div className="row pt-4 my-1">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">Prénom</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" ref="firstName" id="firstName" placeholder={this.state.user.firstName}></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={orange} strokeWidth={2} /></svg>

              <div className="row my-1">
                <label htmlFor="lastName" className="col-sm-4 col-form-label">Nom</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" ref="lastName" id="lastName" placeholder={this.state.user.lastName}></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={orange} strokeWidth={2} /></svg>

              <div className="row my-1">
                <label htmlFor="email" className="col-sm-4 col-form-label">Mail</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" ref="email" id="email" placeholder={this.state.user.email}></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={orange} strokeWidth={2} /></svg>

              <div className="row my-1">
                <label htmlFor="password" className="col-sm-4 col-form-label">Mot de passe</label>
                <div className="col-sm-8">
                  <input type="password" className="form-control" ref="password" id="password" placeholder="●●●●●●"></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={orange} strokeWidth={2} /></svg>

              <div className="row my-1">
                <label htmlFor="password" className="col-sm-4 col-form-label">Confirmation mot de passe</label>
                <div className="col-sm-8">
                  <input type="password" className="form-control" ref="password_conf" id="password_conf" placeholder="●●●●●●"></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={orange} strokeWidth={2} /></svg>

              <div className="row my-1">
                <label htmlFor="goal" className="col-sm-4 col-form-label">Objectif sportif (mn)</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" ref="goal" id="goal" placeholder={this.state.user.goal}></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={orange} strokeWidth={2} /></svg>

              <div className="row my-1">
                <label htmlFor="biography" className="col-sm-4 col-form-label">Biographie</label>
                <div className="col-sm-8">
                  <textarea className="form-control" ref="biography" id="biography" rows="5" maxLength="160" placeholder={this.state.user.bio}></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-outline-success float-right mt-2">Submit</button>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AdministrationAccount