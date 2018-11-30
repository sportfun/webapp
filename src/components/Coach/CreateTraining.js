import React from 'react'
import PropTypes from 'prop-types'
import { postNewTraining } from '../../functions/postRequest';

class CreateTraining extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            sequences: [{ type: 1, totalLength: 0, effortLength: 0, restLength: 0, iteration: 0 }],
        }
    }

    handleNameChange = (e) => {
        let change = {};
        change[e.target.name] = e.target.value
        this.setState(change);
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.name === "")
            return (alert("Veuillez entrer un nom pour l'entrainement"));
        if (this.state.sequences.length === 0)
            return (alert("l'entrainement doit être composé d'au moins une séquence"));
        postNewTraining(this.context.token, this.state, () => {
            alert("l'entrainement a bien été créé !");
            this.props.history.push('/traininglist');
        });
    }

    handleAddSequence = () => {
        this.setState({ sequences: this.state.sequences.concat([{ type: 1, totalLength: 0, effortLength: 0, restLength: 0, iteration: 0 }]) });
    }

    handleRemoveSequence = (index) => () => {
        this.setState({ sequences: this.state.sequences.filter((sequence, sidx) => index !== sidx) });
    }

    handleChange = (index) => (e) => {
        const newSequences = this.state.sequences.map((sequence, sindex) => {
            if (index !== sindex)
                return sequence;
            sequence[e.target.name] = e.target.value;
            if (sequence.type === 3)
                sequence["totalLength"] = (Number(sequence.effortLength) + Number(sequence.restLength)) * Number(sequence.iteration);
            return { ...sequence };
        });
        this.setState({ sequences: newSequences });
    }

    handleChangeType = (type, index) => (e) => {
        const newSequences = this.state.sequences.map((sequence, sindex) => {
            if (index !== sindex) return sequence;
            return { ...sequence, type: type, totalLength: 0, effortLength: 0, restLength: 0, iteration: 0 };
        });
        this.setState({ sequences: newSequences });
        this.refs["tt1" + index].value = 0;
        this.refs["tt2" + index].value = 0;
        this.refs["te3" + index].value = 0;
        this.refs["tr3" + index].value = 0;
        this.refs["tt3" + index].value = 0;
    }

    render() {
        return (
            <div className="pagecontainer h-100 Block card p-sm-5">
                <h3>Création d'un nouvel entrainement</h3><br />

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group w-50">
                        <label htmlFor="name">Nom de l'entrainement</label>
                        <input type="text" maxLength="50" className="form-control" name="name" id="name" onChange={this.handleNameChange} placeholder="Veuillez entrer un nom d'entrainement (obligatoire)"></input><br/>
                        <label htmlFor="description">Description</label>
                        <input type="text" maxLength="50" className="form-control" name="description" id="description" onChange={this.handleNameChange} placeholder="Veuillez entrer une description (facultatif)"></input>
                    </div><br />

                    <h4>Séquences</h4>

                    {this.state.sequences.map((sequence, index) => (
                        <div className="sequence" key={index}>
                            <label htmlFor="Sequence">Séquence #{index + 1}</label>
                            <ul className="nav nav-tabs" id={"myTab" + index} role="tablist">
                                <li className="nav-item"><a className={"nav-link" + (sequence.type === 1 ? ' active' : '')} id={"sprint-tab" + index} data-toggle="tab" href={"#sprint" + index} role="tab" aria-controls="sprint" aria-selected="true" onClick={this.handleChangeType(1, index)}>Sprint</a></li>
                                <li className="nav-item"><a className={"nav-link" + (sequence.type === 2 ? ' active' : '')} id={"endu-tab" + index} data-toggle="tab" href={"#endurance" + index} role="tab" aria-controls="endorance" aria-selected="false" onClick={this.handleChangeType(2, index)}>Endurance</a></li>
                                <li className="nav-item"><a className={"nav-link" + (sequence.type === 3 ? ' active' : '')} id={"fract-tab" + index} data-toggle="tab" href={"#fractionne" + index} role="tab" aria-controls="fractionne" aria-selected="false" onClick={this.handleChangeType(3, index)}>Fractionné</a></li>
                            </ul>
                            <div className="tab-content border border-top-0 rounded-bottom mb-4" id="myTabContent">
                                <div className={"tab-pane fade p-4" + (sequence.type === 1 ? ' active show' : '')} id={"sprint" + index} role="tabpanel" aria-labelledby={"sprint-tab" + index}>
                                    <span className="ml-3" htmlFor="Time">Temps de sprint en minutes : </span>
                                    <input name="totalLength" className="ml-3" id="time" ref={"tt1" + index} type="number" min="0" value={(sequence.type === 1 ? sequence.totalLength : '0')} onChange={this.handleChange(index)} />
                                </div>

                                <div className={"tab-pane fade p-4" + (sequence.type === 2 ? ' active show' : '')} id={"endurance" + index} role="tabpanel" aria-labelledby={"endu-tab" + index}>
                                    <span className="ml-3" htmlFor="Time">Temps d'endurance en minutes : </span>
                                    <input name="totalLength" className="ml-3" id="time" ref={"tt2" + index} type="number" min="0" value={(sequence.type === 2 ? sequence.totalLength : '0')} onChange={this.handleChange(index)} />
                                </div>

                                <div className={"tab-pane fade p-4" + (sequence.type === 3 ? ' active show' : '')} id={"fractionne" + index} role="tabpanel" aria-labelledby={"fract-tab" + index}>
                                    <span className="ml-3" htmlFor="Time"> Temps d'effort : </span>
                                    <input name="effortLength" className="ml-3 mr-5" id="time" ref={"te3" + index} type="number" min="0" value={(sequence.type === 3 ? sequence.effortLength : '0')} onChange={this.handleChange(index)} />
                                    <span className="ml-3" htmlFor="Time"> Temps de récupération : </span>
                                    <input name="restLength" className="ml-3 mr-5" id="time" ref={"tr3" + index} type="number" min="0" value={(sequence.type === 3 ? sequence.restLength : '0')} onChange={this.handleChange(index)} />
                                    <span className="ml-3" htmlFor="Time"> Nombre d'itération : </span>
                                    <input name="iteration" className="ml-3 mr-5" id="time" ref={"tr3" + index} type="number" min="0" value={(sequence.type === 3 ? sequence.iteration : '0')} onChange={this.handleChange(index)} /><br /><br />
                                    <span className="ml-3" htmlFor="Time"> Durée totale de l'activité : </span>
                                    <input readOnly="readonly" className="border-0" id="time" ref={"tt3" + index} type="number" min="0" value={(sequence.type === 3 ? sequence.totalLength : '0')} />
                                </div>
                            </div>
                            <button className="btn btn-light float-right btn-sm" type="button" onClick={this.handleRemoveSequence(index)} >Supprimer cette séquence</button>
                        </div>
                    ))}

                    <button className="mt-4 btn btn-secondary" type="button" onClick={this.handleAddSequence} >Ajouter une séquence</button><br />
                    <button className="float-right mt-4 col-md-3 text-center btn btn-success" type="submit">Créer l'entrainement</button>
                </form>
            </div>
        )
    }
}

CreateTraining.contextTypes = {
    apiurl: PropTypes.string,
    token: PropTypes.string,
    getUserInfo: PropTypes.func
};

export default CreateTraining;