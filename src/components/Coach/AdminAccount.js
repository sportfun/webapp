import React from 'react'

class AdminAccount extends React.Component {
    constructor(props) {
        super(props)
    //    this.getUserByUsername = this.getUserByUsername.bind(this)
        this.state = {
            user: {},
            loading: true
        }
    }

    componentWillMount() {
        console.log(this.props)
       // this.getUserByUsername(this, this.props.match.params.username);
    }
/*
    getUserByUsername = (self, username) => {
        console.log("je cherche");
        axios.get('http://149.202.41.22:8080/api/users')
            .then(response => {
                response.data.forEach(function (item) {
                    if (item.userName === username)
                        self.setState({
                            user: item,
                            loading: false
                        })
                });
            })
            .catch((error) => {
                console.log("error", error)
            })
    }*/

    render() {
        if (!this.state.loading) {
            return false;
        }
        else {
            return (
                <div className="pagecontainer h-100 Block card p-sm-5">
                    <h3>Administration de compte</h3><br />

                    <form>
                        <div class="form-group w-50">
                            <label for="firstName">Prénom</label>
                            <input type="firstName" class="form-control" id="firstName" placeholder="Entrer prénom"></input>
                        </div>
                        <div class="form-group w-50">
                            <label for="lastName">Nom</label>
                            <input type="lastName" class="form-control" id="lastName" placeholder="Entrer nom"></input>
                        </div>
                        <div class="form-group w-50">
                            <label for="nickName">Surnom</label>
                            <input type="nickName" class="form-control" id="nickName" placeholder="Entrer surnom"></input>
                        </div>
                        <div class="form-group w-50">
                            <label for="email">Adresse mail</label>
                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrer email"></input>
                        </div>
                        <div class="form-group w-50">
                            <label for="password">Mot de passe</label>
                            <input type="password" class="form-control" id="password" placeholder="Mot de passe"></input>
                        </div>
                        <div class="form-group w-50">
                            <label for="biography">Biographie</label>
                            <textarea class="form-control" id="biography" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default AdminAccount;