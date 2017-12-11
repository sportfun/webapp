import React from 'react';
import { Link } from 'react-router-dom'


class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    this.setState({
      users: this.props.location.state.users
    })
  }

  shouldComponentUpdate() {
    this.render();
    console.log("false")
    return (true);
  }

  render() {
    console.log(this.state.users.length);
    if (this.state.users.length !== 0) {
      var listUsers = this.state.users.map(function (elem, index) {
        return (
          <Link to={`/profile/${elem.userName}`} key={elem._id}>
            <li className="item-user p-sm-3" >
              <img className="rounded-avatar" alt='profilePicture-item' src={elem.profilePicture} />
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

export default Users