import React from 'react';
import { Link } from 'react-router-dom'
import { fetchUsers } from '../functions/fetchUsers'
import PropTypes from 'prop-types'


class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      searchTerm: "",
      loading: false,
    }
  }

  componentWillMount() {
    this.setState({searchTerm: this.props.location.state.searchTerm});
    fetchUsers(this.props.location.state.searchTerm, this.context.token, (data) => {
      this.setState({ users: data });
      this.setState({ loading: true });
    });
  }

  componentWillReceiveProps(nextProps) {
   //if (nextProps.location.state.searchTerm !== this.state.searchTerm)
    //{
      fetchUsers(nextProps.location.state.searchTerm, this.context.token, (data) => {
        this.setState({searchTerm: nextProps.location.state.searchTerm});
        this.setState({users: data});
      });
    //}
  }


  render() {
    if(!this.state.loading){return null}

    if (this.state.users.length !== 0) {
    
      var listUsers = this.state.users.map((elem, index) => {
        return (
          <Link to={`/profile/${elem.username}`} key={elem._id}>
            <li className="item-user p-sm-3" >
              <img className="rounded-avatar" alt='profilePicture-item' src={this.context.apiurl + elem.profilePic} />
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