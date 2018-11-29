import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { filterTraining } from '../../functions/fetchUsers';
import { deleteTraining } from '../../functions/putRequest';
import ApiManager from '../ApiManager'

class TrainingList extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            trainings: [],
            loading: false,
            searchTerm: ''
        }
    }

    componentWillMount() {
        ApiManager.getTrainingList().then((data) => {
            this.setState({ trainings: data });
            this.setState({ loading: true });
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ searchTerm: this.refs["search_value"].value }, () => {
         
         /*
            history.push({
            pathname: `/users/${this.state.searchTerm}`,
            state: { searchTerm: this.state.searchTerm },
          });
        */

        filterTraining(this.state.searchTerm, this.context.token, this.state.trainings, (data) => {
            console.log(data);
            this.setState({trainings: data});
        }
    )
        });
      }

    submit = e => {
        e.preventDefault();
    }

    DeleteTraining = (token) => (e) => {
        deleteTraining(this.state.token, e._id, () => {
            console.log("event triggered")
        })
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
                            <td><Link to={`/edittraining/${elem._id}`} className="btn btn-light"> Modifier </Link></td>
                            <td><button className="btn btn-light" onClick={this.DeleteTraining(this.context.token)}>Supprimer</button></td>
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
                <form className="form-inline my-2 my-lg-0 w-50" onSubmit={this.handleSubmit}>
                    <input ref="search_value" name="search_value" className="form-control mr-sm-2 w-65" type="text" placeholder="Rechercher un entrainement" aria-label="Rechercher" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Rechercher</button>
                </form><br/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Nombre de séquence</th>
                            <th>Description</th>
                            <th>Modifier l'entrainement</th>
                            <th>Supprimer l'entrainement</th>
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