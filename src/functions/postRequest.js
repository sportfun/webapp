import axios from 'axios'

export const postNewTraining = (token, training, callback) => {
    axios({
        method: 'post',
        url: 'http://149.202.41.22:8080/api/training',
        data: training,
        headers: { "token": token }
    }).then(response => {
        callback();
    }).catch(error => {
        alert("Le nom est déjà pris, veuillez entrer un autre nom d'entrainement.")
    })
};