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

export const assignTraining = (token, user, id_training, callback) => {
    var data = {
        username: user,
        id: [id_training]
    }
    axios({
        method: 'put',
        url: 'http://149.202.41.22:8080/api/user/training',
        data: data,
        headers: { "token": token }
    }).then(response => {
        callback();
    }).catch(error => {
        console.log(error.response)
    })
};

export const deleteTraining = (token, id_training, callback) => {
    var data = {
        id: [id_training]
    }
    axios({
        method: 'delete',
        url: 'http://149.202.41.22:8080/api/training',
        data: data,
        headers: { "token": token }
    }).then(response => {
        callback();
    }).catch(error => {
        console.log(error.response)
        alert("Liaison avec la route en cours")
    })
}; 