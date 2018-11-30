import axios from 'axios'

export const editTraining = (token, id, training, callback) => {
    axios({
        method: 'put',
        url: 'http://149.202.41.22:8080/api/training/' + id,
        data: training,
        headers: { "token": token }
    }).then(response => {
        callback();
    }).catch(error => {
        console.log(error.response)
    })
};