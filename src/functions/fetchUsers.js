import axios from 'axios'

export const fetchUsers = (searchTerm, token, callback) => {
    var allUsers, filterUsers;

    axios.get('http://149.202.41.22:8080/api/user', {
        headers: { "token": token }
    })
        .then(function (response) {
            allUsers = response.data;
            filterUsers = allUsers.filter(function (user) {
                return (user.username.indexOf(searchTerm) !== -1);
            });
            callback(filterUsers);
        })
        .catch(function (error) {
            console.log(error);
        });
}
/*
export 

export const getUserById = (username, callback) => {
    var searchUser, allUsers;
    console.log(username);

    axios.get('http://149.202.41.22:8080/api/users')
        .then(function (response) {
            allUsers = response.data;
            searchUser = allUsers.filter(function (user) {
                return (user.userName === username);
            });
            callback(searchUser);
        })
        .catch(function (error) {
            console.log(error);
        });
}

*/