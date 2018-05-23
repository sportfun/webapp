import axios from 'axios'

export const fetchUsers = (searchTerm, token, callback) => {
    var allUsers, filterUsers;

    axios.get('http://149.202.41.22:8080/api/user/debug', {
        headers: { "token": token }
    })
        .then(function (response) {
            allUsers = response.data.data;
            console.log(response.data.data);
            /*
            filterUsers = allUsers.filter(function (user) {
                console.log(filterUsers)
                return (user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
            });
            */
           console.log("ézaera")
            callback(allUsers);
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