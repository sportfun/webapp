import axios from 'axios'
import PropTypes from 'prop-types'

export const getInfoUser = (token, callback) => {
    axios.get("http://149.202.41.22:8080/api/user/self", {
        headers: { "token": token }
    })
        .then(response => {
            callback(response.data.data);
        })
        .catch((error) => {
            console.log("error", error);
        })
};

export const storeInfoUser = (token, callback) => {
    axios.get("http://149.202.41.22:8080/api/user/self", {
        headers: { "token": token }
    })
        .then(response => {
            localStorage.setItem('firstName', response.data.data.firstName);
            localStorage.setItem('lastName', response.data.data.lastName);
            localStorage.setItem('username', response.data.data.username);
            localStorage.setItem('bio', response.data.data.bio);
            localStorage.setItem('profilePic', response.data.data.profilePic);
            localStorage.setItem('coverPic', response.data.data.coverPic);
            callback();
        })
        .catch((error) => {
            console.log("error", error);
        })
};

export const getUserById = (token, username, callback) => {
    var searchUser, allUsers;
    axios.get('http://149.202.41.22:8080/api/user', {
        headers: { "token": token }
    })
        .then(function (response) {
            allUsers = response.data;
            searchUser = allUsers.filter(function (user) {
                return (user.username === username);
            });
            callback(searchUser[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
}