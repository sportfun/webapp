import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getClientList } from '../../functions/getRequest';

class TrainingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trainings: {},
            loading: false
        }
    }

    componentWillMount() {
        getClientList(this.context.token, localStorage.getItem('username'), (data) => {
            this.setState({ trainings: data });
            this.setState({ loading: true });
        })
    }

    submit = e => {
        e.preventDefault();
    }

    render() {
        if (!this.state.loading) { return null }
        if (this.state.trainings.length !== 0) {
            var listTrainings =
                this.state.trainings.map((elem, index) => {
                    return (
                        <tr key={elem._id}>
                            <td>{Number(index + 1)}</td>
                            <td>{elem.name}</td>
                            <td>{elem.sequences.length}</td>
                            <td>{elem.description}</td>
                            <td><Link to={`/edittraining/${elem._id}`}> lien </Link></td>
                        </tr>
                    );
                });
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
                            <th>Modifier</th>
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