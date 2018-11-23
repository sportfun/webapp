import React from 'react';
import { Link } from 'react-router-dom'
import ApiManager from '../ApiManager'
import PropTypes from 'prop-types'
import profilepic from '../../assets/img/user.png'


class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      pattern: "",
      loading: false,
    }
  }

  componentWillMount() {
    ApiManager.getUsersByPattern(this.props.location.state.pattern)
      .then(users => {
        this.setState({
          users: users,
          loading: false,
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: []})
    ApiManager.getUsersByPattern(nextProps.location.state.pattern)
    .then(users => {
      this.setState({
        users: users,
        pattern: nextProps.location.state.pattern,
      })
    })
  }


  render() {
    console.log(this.state.users.length)
    if(this.state.loading){return null}

    if (this.state.users.length !== 0) {
    
      var listUsers = this.state.users.map((elem, index) => {
        return (
          <Link to={`/profile/${elem.username}`} key={elem._id}>
            <li className="item-user p-sm-3" >
              <img className="rounded-avatar" alt='profilePicture-item' src={profilepic} />
              <div className="info-item-user">
                {elem.firstName} {elem.lastName}
              </div>
            </li>
          </Link>
        );
      });
    }
    else {
      return (
        <li className="item-user p-sm-3">
          <div className="info-item-user">Pas de résultat </div>
        </li>
      )
    }
    return (
      <div className="table-responsive">
        <ul className="list-unstyled">
          {listUsers}
        </ul>
      </div>
    );
  }
}

Users.contextTypes = {
  token: PropTypes.string,
  apiurl: PropTypes.string,
};

export default Users