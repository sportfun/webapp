import React from 'react'
import PropTypes from 'prop-types'
import { getInfoUser } from '../functions/basics';

class AdministrationAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentWillMount(){
    getInfoUser(this.context.token, (data) => {
        this.setState({user: data});
    });
  }

  render() {
    let coords = { x1: 0, y1: 0, x2: 550, y2: 0 };

    return (
      <div id="AdministrationAccount" className="card mb-4">
        <div className="card">
          <div className="info-user p-sm-3">
            <h2> Paramètres du compte </h2>
            <form>

              <div className="row pt-4 my-1">
                <label htmlFor="firstName" className="col-sm-3 col-form-label">Prénom</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="firstName" placeholder={this.state.user.firstName}></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={this.context.orangecolor} strokeWidth={2} /></svg>

              <div className="row my-1">
                <label htmlFor="lastName" className="col-sm-3 col-form-label">Nom</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="lastName" placeholder={this.state.user.lastName}></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={this.context.orangecolor} strokeWidth={2} /></svg>

              <div className="row my-1">
                <label htmlFor="email" className="col-sm-3 col-form-label">Mail</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="email" placeholder={this.state.user.email}></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={this.context.orangecolor} strokeWidth={2} /></svg>

              <div className="row my-1">
                <label htmlFor="password" className="col-sm-3 col-form-label">Mot de passe</label>
                <div className="col-sm-9">
                  <input type="password" className="form-control" id="password"></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={this.context.orangecolor} strokeWidth={2} /></svg>

              <div className="row my-1">
                <label htmlFor="sportsHall" className="col-sm-3 col-form-label">Salle de sport</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="sportsHall"></input>
                </div>
              </div>
              <svg height="2" width="100%" style={{ verticalAlign: "middle" }}><line {...coords} stroke={this.context.orangecolor} strokeWidth={2} /></svg>


              <div className="row my-1">
                <label htmlFor="biography" className="col-sm-3 col-form-label">Biographie</label>
                <div className="col-sm-9">
                  <textarea className="form-control" id="biography" rows="5" placeholder={this.state.user.bio}></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-primary float-right mt-2">Submit</button>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

AdministrationAccount.contextTypes = {
  apiurl: PropTypes.string,
  token: PropTypes.string,
  orangecolor: PropTypes.string
};

export default AdministrationAccount