import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { getUserById } from '../../functions/getRequest';

class EditSession extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: {},
            loading: true
        }
    }

    componentWillMount() {
        getClientList(this.context.token, localStorage.getItem('username'), (data) => {
            this.setState({ clients: data });
        })
    }

    submit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://149.202.41.22:8080/api/user/edit/info',
            data: {
                firstName: this.refs["firstName"].value,
                lastName: this.refs["lastName"].value,
                email: this.refs["email"].value,
                password: this.refs["password"].value,
                bio: this.refs["biography"].value
            },
            headers: { "token": this.context.token }
        }).then(response => {
            window.location.reload();
            console.log(response);
        }).catch(error => {
            console.log(error.response)
        })
    }

    render() {

    }
}


CoachAdmin.contextTypes = {
    apiurl: PropTypes.string,
    token: PropTypes.string,
    getUserInfo: PropTypes.func
};

export default EditSession;