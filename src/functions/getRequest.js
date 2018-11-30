import axios from 'axios'

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