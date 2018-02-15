import React from 'react'
import { Link } from 'react-router-dom'
import CoachSidebarLeft from './SidebarLeft'

class Coach extends React.Component {

  render() {

    var imageSize = {
      height: "50%",
      width: "60%",
      padding: "3%",
    };

    var bgColors = {
      "Blue": "rgba(31, 189, 230, 0.7)",
      "Green": "rgba(72, 179, 96, 0.7)",
      "Grey": "rgba(133, 140, 150, 0.7)",
    };

    return (
        <div className="Block card px-5 py-3 h-100">
          <br /><h3 className="px-5">Bienvenue</h3><br />

          <div className="card-deck">

            <div className="card border-info text-center">
              <Link to='/'>
                <div className="card-header" style={{ backgroundColor: bgColors.Blue }}>
                  <img className="card-img-top rounded mx-auto d-block" src="ressources/customers.png" alt="Card image cap" style={imageSize} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Voir vos clients</h5>
                  <p className="card-text">Affichez une liste de vos clients et visualisez leurs sessions sportives passées ou à venir</p>
                </div>
              </Link>
            </div>

            <div className="card border-success text-center">
              <Link to='/'>
                <div className="card-header" style={{ backgroundColor: bgColors.Green }}>
                  <img className="card-img-top rounded mx-auto d-block" src="ressources/session.png" alt="Card image cap" style={imageSize} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Créer ou modifier une séance</h5>
                  <p className="card-text">Créez un nouveau programme sportif ou gérez les séances que vous avez déjà préparées</p>
                </div>
              </Link>
            </div>

            <div className="card border-secondary text-center">
              <Link to='/coachadministration'>
                <div className="card-header" style={{ backgroundColor: bgColors.Grey }}>
                  <img className="card-img-top rounded mx-auto d-block" src="ressources/settingsc.png" alt="Card image cap" style={imageSize} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Administration du compte</h5>
                  <p className="card-text">Modifiez vos informations personnelles</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
    )
  }
}

export default Coach;