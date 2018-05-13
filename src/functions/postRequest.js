import axios from 'axios'

export const postNewTraining = (token, infos) => {
    var data = infos;
    console.log(JSON.stringify(infos));
    axios({
        method: 'post',
        url: 'http://149.202.41.22:8080/api/training',
        data: data,
        headers: { "token": token }
    }).then(response => {
        alert("l'entrainement a bien été créé !");
    }).catch(error => {
        alert("Le nom est déjà pris, veuillez entrer un autre nom d'entrainement.")
    })
};