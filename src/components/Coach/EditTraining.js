import React from 'react'
import PropTypes from 'prop-types'

class EditTraining extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            sequence: [{ type: '', time: 0 }],
        }
    }

    componentWillMount() {
        /*
        getFriends(this.context.token, (data) => {
            this.setState({ clients: data });
        })
        */
    }


    submit = e => {
        e.preventDefault();
    }

    handleSubmit = (evt) => {
        const { name, sequence } = this.state;
        alert(`Incorporated: ${name} with ${sequence.length} sequence`);
    }

    handleAddShareholder = () => {
        this.setState({ sequence: this.state.sequence.concat([{ name: '' }]) });
    }

    handleRemoveShareholder = (idx) => () => {
        this.setState({ sequence: this.state.sequence.filter((s, sidx) => idx !== sidx) });
    }

    render() {
        return (
            <div className="pagecontainer h-100 Block card p-sm-5">
                <h3>Création d'un nouvel entrainement</h3><br />

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group w-50">
                        <label htmlFor="firstName">Nom de l'entrainement</label>
                        <input type="text" className="form-control" ref="name" id="name" placeholder="Entrainement n°1"></input>
                    </div><br />

                    <h4>Séquences</h4>

                    {this.state.sequence.map((shareholder, index) => (
                        <div className="sequence" key={index}>
                            <label htmlFor="Sequence">Séquence #{index + 1}</label>
                            <ul className="nav nav-tabs" id={"myTab" + index} role="tablist">
                                <li className="nav-item"><a className="nav-link active" id={"sprint-tab" + index} data-toggle="tab" href={"#sprint" + index} role="tab" aria-controls="sprint" aria-selected="true">Sprint</a></li>
                                <li className="nav-item"><a className="nav-link" id={"endu-tab" + index} data-toggle="tab" href={"#endurance" + index} role="tab" aria-controls="endorance" aria-selected="false">Endurance</a></li>
                                <li className="nav-item"><a className="nav-link" id={"fract-tab" + index} data-toggle="tab" href={"#fractionne" + index} role="tab" aria-controls="fractionne" aria-selected="false">Fractionné</a></li>
                            </ul>
                            <div className="tab-content border border-top-0 rounded-bottom mb-4" id="myTabContent">
                                <div className="tab-pane fade show active p-4" id={"sprint" + index} role="tabpanel" aria-labelledby={"sprint-tab" + index}>
                                    <span className="ml-3" htmlFor="Time">Temps de sprint en minutes : </span>
                                    <input className="ml-3" id="time" type="number" />
                                </div>
                                <div className="tab-pane fade p-4" id={"endurance" + index} role="tabpanel" aria-labelledby={"endu-tab" + index}>
                                    <span className="ml-3" htmlFor="Time">Temps d'endurance en minutes : </span>
                                    <input className="ml-3" id="time" type="number" />
                                </div>
                                <div className="tab-pane fade p-4" id={"fractionne" + index} role="tabpanel" aria-labelledby={"fract-tab" + index}>
                                    <span className="ml-3" htmlFor="Time">Temps d'effort : </span>
                                    <input className="ml-3 mr-5" id="time" type="number" />
                                    <span className="ml-3" htmlFor="Time">Temps de récupération : </span>
                                    <input className="ml-3 mr-5" id="time" type="number" />
                                    <span className="ml-3" htmlFor="Time">Durée totale de l'activité : </span>
                                    <input className="ml-3" id="time" type="number" />
                                </div>
                            </div>
                            <button className="btn btn-light float-right btn-sm" type="button" onClick={this.handleRemoveShareholder(index)} >Supprimer cette séquence</button>
                        </div>
                    ))}

                    <button className="mt-4 btn btn-secondary" type="button" onClick={this.handleAddShareholder} >Ajouter une séquence</button><br />
                    <button className="float-right mt-4 col-md-3 text-center btn btn-success" type="submit">Créer l'entrainement</button>
                </form>
            </div>
        )
    }
}

//ReactDOM.render(<CreateSession />, document.body);

EditTraining.contextTypes = {
    apiurl: PropTypes.string,
    token: PropTypes.string,
    getUserInfo: PropTypes.func
};

export default EditTraining;