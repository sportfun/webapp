import axios from 'axios'

export const getInfoUser = (token, callback) => {
    axios.get("http://149.202.41.22:8080/api/user", {
        headers: { "token": token }
    })
        .then(response => {
            callback(response.data.data);
        })
        .catch((error) => {
            console.log("error", error);
        })
};

export const getActivityUser = (token, callback) => {
    axios.get("http://149.202.41.22:8080/api/activity", {
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
    axios.get("http://149.202.41.22:8080/api/user", {
        headers: { "token": token }
    })
        .then(response => {
            localStorage.setItem('firstName', response.data.data.firstName);
            localStorage.setItem('id', response.data.data._id);
            localStorage.setItem('lastName', response.data.data.lastName);
            localStorage.setItem('username', response.data.data.username);
            localStorage.setItem('bio', response.data.data.bio);
            localStorage.setItem('profilePic', response.data.data.profilePic);
            localStorage.setItem('coverPic', response.data.data.coverPic);
            callback();
        })
        .catch((error) => {
            console.log(error.response)
        })
};

export const getUserByUsername = (token, username, callback) => {
    axios.get('http://149.202.41.22:8080/api/user/q/' + username, {
        headers: { "token": token }
    })
        .then(function (response) {
            callback(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getUserById = (token, username, callback) => {
    var searchUser, allUsers;
    axios.get('http://149.202.41.22:8080/api/user/q/:' + { username }, {
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

export const getFriends = (token, callback) => {
    axios.get('http://149.202.41.22:8080/api/user', {
        headers: { "token": token }
    })
        .then(function (response) {
            callback(response.data.friends);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getTrainingList = (token, username, callback) => {
    axios.get('http://149.202.41.22:8080/api/training', {
        headers: { "token": token }
    })
        .then(function (response) {
            callback(response.data.data);
        })
        .catch(function (error) {
            console.log("error e :" + error);
        })
}

export const getTrainingById = (token, id, callback) => {
    axios.get('http://149.202.41.22:8080/api/training/' + id, {
        headers: { "token": token }
    })
        .then(function (response) {
            callback(response.data.data);
        })
        .catch(function (error) {
            console.log("error e :" + error);
        })
}
