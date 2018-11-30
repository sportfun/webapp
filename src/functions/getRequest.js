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