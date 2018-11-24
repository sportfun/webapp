import axios from 'axios'

export const getUsersByPattern = (pattern, token, callback) => {
    axios.get('http://149.202.41.22:8080/api/user/p/' + pattern, {
        headers: { "token": token }
    })
        .then(function (response) {
            callback(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getActivityUser = (token, callback) => {
    axios.get("http://149.202.41.22:8080/api/activity", {
        headers: { "token": token }
    })
        .then(response => {
            callback(response.data.data);
        })
        .catch((error) => {
            console.log(error);
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

export const getTrainingById = (token, id, callback) => {
    axios.get('http://149.202.41.22:8080/api/training/' + id, {
        headers: { "token": token }
    })
        .then(function (response) {
            console.log("YOH : " + response.data.data)
            callback(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const getAssignTrainings = (token, id, callback) => {
    return axios.get('http://149.202.41.22:8080/api/user/t/' + id, {
        headers: { "token": token }
    })
        .then(function (response) {
           // console.log("GET " + JSON.stringify(response.data.data))
            if (callback) {
                callback(response.data.data);
            } else {
                return response.data.data
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}