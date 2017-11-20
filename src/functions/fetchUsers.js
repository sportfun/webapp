import axios from 'axios'

export const fetchUsers = (searchTerm, callback) => {
    var allUsers, filterUsers;

    console.log("searchterm : " + searchTerm);

    axios.get('http://149.202.41.22:8080/api/users')
        .then(function (response) {
            allUsers = response.data;
            console.log(allUsers);
            filterUsers = allUsers.filter(function (user) {
                if (user.firstName === undefined)
                    return(0);
                else
                    return (user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
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