import axios from 'axios'

export const editUserInfo = (token, infos, callback) => {
    var data = {
        firstName: infos[0],
        lastName: infos[1],
        email: infos[2],
        password: infos[3],
        bio: infos[4],
    }
    if (infos.length === 6)
        data['goal'] = infos[5];
    axios({
        method: 'put',
        url: 'http://149.202.41.22:8080/api/user',
        data: data,
        headers: { "token": token }
    }).then(response => {
        callback();
    }).catch(error => {
        console.log(error.response)
    })
};