import ApiManager from '../../ApiManager'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Activities extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      activities: [],
      loading: true,
    }
  }

  componentDidMount() {
    ApiManager.getActivities(this.props.user.username).then(activities => {
      this.setState({ activities: activities, loading: false })
    })
  }

  render() {
    if (this.state.loading) {
      return <p>Chargement…</p>
    }
    if (this.state.activities.length !== 0) {
      let activities = this.state.activities
      return (
        <DocumentTitle title={`Activités de ${this.props.user.username}`}>
          <div id="ActivitiesPage" className="card mb-4 p-sm-3">
            <h3>Vous avez joué à...</h3>
            {activities.map(function(elem, index) {
              let date = new Date(elem.date)
              return (
                <div className="card m-4" key={index}>
                  <div className="card-header">
                    <span className="mx-5">Jeu exemple</span>
                  </div>
                  <div className="card-block align">
                    <img
                      className="card-img-top rounded-circle wp-100 hp-100 my-3 mx-5 d-block"
                      src="images/jeu1.jpg"
                      alt="Card"
                    />
                    <div className="">
                      type d&apos;effort : {elem.type} <br />
                      le{' '}
                      {date.getMonth() +
                        1 +
                        '/' +
                        date.getDate() +
                        '/' +
                        date.getFullYear()}
                      <br />
                      pendant {elem.timeSpent} minute(s)<br />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </DocumentTitle>
      )
    } else {
      return (
        <DocumentTitle title={`Activités de ${this.state.user.username}`}>
          <div id="ActivitiesPage" className="card mb-4 p-sm-3">
            <h3>Vous n&apos;avez pas encore joué à sportsFun !</h3>
          </div>
        </DocumentTitle>
      )
    }
  }
}

export default Activities
