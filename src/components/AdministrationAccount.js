import React from 'react'
import axios from 'axios'

class AdministrationAccount extends React.Component {
  constructor(props) {
    super(props)
    this.getUserByUsername = this.getUserByUsername.bind(this)
    this.state = {
      user: {},
      loading: true
    }
  }

  componentWillMount() {
    console.log(this.props)
    this.getUserByUsername(this, this.props.match.params.username);
  }

  getUserByUsername = (self, username) => {
    console.log("je cherche");
    axios.get('http://149.202.41.22:8080/api/users')
      .then(response => {
        response.data.forEach(function (item) {
          if (item.userName === username)
            self.setState({
              user: item,
              loading: false
            })
        });
      })
      .catch((error) => {
        console.log("error", error)
      })
  }

  render() {
    /*
  if (this.state.loading) {
    return false;
  }
  else {
      */
    return (
      <div id="AdministrationAccount" className="card mb-4">
        <div className="card">
          <div className="info-user p-sm-3">
            <h2> Paramètres du compte </h2>
            <ul className="list-unstyled">
              <li className="AdminAccountItem">
                <a>
                  <h3>Prénom</h3>
                  <span>{this.state.user.firstName}</span>
                </a>
              </li>
              <li className="AdminAccountItem">
                <a>
                  <h3>Nom</h3>
                </a>
              </li>
              <li className="AdminAccountItem">
                <a>
                  <h3>Nom d'utilisateur</h3>
                </a>
              </li>
              <li className="AdminAccountItem">
                <a>
                  <h3>Mot de passe</h3>
                </a>
              </li>
              <li className="AdminAccountItem">
                <a>
                  <h3>Date de naissance</h3>
                </a>
              </li>
              <li className="AdminAccountItem">
                <a>
                  <h3>Salle de sport</h3>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  //  }
}

export default AdministrationAccount