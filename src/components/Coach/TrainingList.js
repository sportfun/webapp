import React from 'react'
import PropTypes from 'prop-types'
import { getUserById } from '../../functions/getRequest';

class TrainingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trainings: {},
            loading: true
        }
    }

    componentWillMount() {
        /*
        getClientList(this.context.token, localStorage.getItem('username'), (data) => {
            this.setState({ clients: data });
        })
        */
    }

    submit = e => {
        e.preventDefault();
    }

    render() {
        if (this.state.trainings.length !== 0) {

            var listTrainings =
                <tr>
                    <td>1</td>
                    <td>A fond la forme!</td>
                    <td>3</td>
                    <td>30mn cardio + 50s sprint</td>
                    <td>*Lien vers l'édition*</td>
                </tr>
            /*
            = this.state.clients.map((elem, index) => {
                return (
                    <Link to={`/profile/${elem.username}`} key={elem._id}>
                        <tr>
                            <td><img className="rounded-avatar" alt='profilePicture-item' src={this.context.apiurl + elem.profilePic} /></td>
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                        </tr>
                    </Link>
                    
                );
            });
            */
        }
        else {
            return (
                <div>Pas de résultat</div>
            )
        }
        return (
            <div className="pagecontainer h-100 Block card p-sm-5">
                <h2>Liste de vos entrainements personnalisés</h2>
                <p>Détails et informations des entrainements</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Nombre de séquence</th>
                            <th>Notes</th>
                            <th>Détails</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTrainings}
                    </tbody>
                </table>
            </div>
        )
    }
}

TrainingList.contextTypes = {
    apiurl: PropTypes.string,
    token: PropTypes.string,
    getUserInfo: PropTypes.func
};

export default TrainingList;