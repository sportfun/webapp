import React from 'react'
import PropTypes from 'prop-types'

class CreateSession extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            sequences: [{ type: 1, time_total: 0, time_effort: 0, time_recup: 0 }],
        }
    }

    componentWillMount() {
        /*
        getFriends(this.context.token, (data) => {
            this.setState({ clients: data });
        })
        */
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value }, () =>
            console.log("name changed : " + this.state.name)
        );
    }

    submit = e => {
        e.preventDefault();
        console.log(e);
    }

    handleSubmit = (evt) => {
        const { name, sequence } = this.state;
        alert(`Incorporated: ${name} with ${sequence.length} sequence`);
    }

    handleAddSequence = () => {
        this.setState({ sequences: this.state.sequences.concat([{ type: 1, time_total: 0, time_effort: 0, time_sprint: 0 }]) });
    }

    handleRemoveSequence = (idx) => () => {
        this.setState({ sequences: this.state.sequences.filter((s, sidx) => idx !== sidx) });
    }

    handleTotalTimeChange = (index) => (e) => {
        console.log("total time change : " + e.target.value + " at : " + index) 
        const newSequences = this.state.sequences.map((sequence, sindex) => {
          if (index !== sindex) return sequence;
          return { ...sequence, time_total: e.target.value };
        });
        this.setState({ sequences: newSequences });
        console.log(this.state.sequences)
    }

    handleTimeEffortChange = (index) => (e) => {
        console.log("time effort change : " + e.target.value + " at : " + index) 
        const newSequences = this.state.sequences.map((sequence, sindex) => {
          if (index !== sindex) return sequence;
          return { ...sequence, time_effort: e.target.value };
        });
        this.setState({ sequences: newSequences });
        console.log(this.state.sequences)

    }

    handleTimeRecupChange = (index) => (e) => {
        console.log("time effort change : " + e.target.value + " at : " + index) 
        const newSequences = this.state.sequences.map((sequence, sindex) => {
          if (index !== sindex) return sequence;
          return { ...sequence, time_recup: e.target.value };
        });
        this.setState({ sequences: newSequences });
        console.log(this.state.sequences)

    }
    
    handleChangeType = (type, index) => (e) => {
        console.log("changement de type : " + type)
        const newSequences = this.state.sequences.map((sequence, sindex) => {
          if (index !== sindex) return sequence;
          return { ...sequence, type: type, time_total: 0, time_effort: 0, time_recup: 0 };
        });
        this.setState({ sequences: newSequences });
        this.refs["tt1" + index].value = 0;
        this.refs["tt2" + index].value = 0;
        this.refs["te3" + index].value = 0;
        this.refs["tr3" + index].value = 0;
        this.refs["tt3" + index].value = 0;
        console.log(this.state.sequences)
    }

    render() {
        return (
            <div className="pagecontainer h-100 Block card p-sm-5">
                <h3>Création d'un nouvel entrainement</h3><br />

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group w-50">
                        <label htmlFor="firstName">Nom de l'entrainement</label>
                        <input type="text" className="form-control" ref="name" id="name" onChange={this.handleNameChange} placeholder="Entrainement n°1"></input>
                    </div><br />

                    <h4>Séquences</h4>

                    {this.state.sequences.map((sequence, index) => (
                        <div className="sequence" key={index}>
                            <label htmlFor="Sequence">Séquence #{index + 1}</label>
                            <ul className="nav nav-tabs" id={"myTab" + index} role="tablist">
                                <li className="nav-item"><a className="nav-link active" id={"sprint-tab" + index} data-toggle="tab" href={"#sprint" + index} role="tab" aria-controls="sprint" aria-selected="true" onClick={this.handleChangeType(1, index)}>Sprint</a></li>
                                <li className="nav-item"><a className="nav-link" id={"endu-tab" + index} data-toggle="tab" href={"#endurance" + index} role="tab" aria-controls="endorance" aria-selected="false" onClick={this.handleChangeType(2, index)}>Endurance</a></li>
                                <li className="nav-item"><a className="nav-link" id={"fract-tab" + index} data-toggle="tab" href={"#fractionne" + index} role="tab" aria-controls="fractionne" aria-selected="false" onClick={this.handleChangeType(3, index)}>Fractionné</a></li>
                            </ul>
                            <div className="tab-content border border-top-0 rounded-bottom mb-4" id="myTabContent">
                                <div className="tab-pane fade show active p-4" id={"sprint" + index} role="tabpanel" aria-labelledby={"sprint-tab" + index}>
                                    <span className="ml-3" htmlFor="Time">Temps de sprint en minutes : </span>
                                    <input className="ml-3" id="time" ref={"tt1" + index} type="number" defaultValue="0" onChange={this.handleTotalTimeChange(index)} />
                                </div>
                                <div className="tab-pane fade p-4" id={"endurance" + index} role="tabpanel" aria-labelledby={"endu-tab" + index}>
                                    <span className="ml-3" htmlFor="Time">Temps d'endurance en minutes : </span>
                                    <input className="ml-3" id="time" ref={"tt2" + index} type="number" defaultValue="0" onChange={this.handleTotalTimeChange(index)}/>
                                </div>
                                <div className="tab-pane fade p-4" id={"fractionne" + index} role="tabpanel" aria-labelledby={"fract-tab" + index}>
                                    <span className="ml-3" htmlFor="Time"> Temps d'effort : </span>
                                    <input className="ml-3 mr-5" id="time" ref={"te3" + index} type="number" defaultValue="0" onChange={this.handleTimeEffortChange(index)} />
                                    <span className="ml-3" htmlFor="Time"> Temps de récupération : </span>
                                    <input className="ml-3 mr-5" id="time" ref={"tr3" + index} type="number" defaultValue="0" onChange={this.handleTimeRecupChange(index)}/>
                                    <span className="ml-3" htmlFor="Time"> Durée totale de l'activité : </span>
                                    <input className="ml-3" id="time" ref={"tt3" + index} type="number" defaultValue="0" onChange={this.handleTotalTimeChange(index)}/>
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

//ReactDOM.render(<CreateSession />, document.body);

CreateSession.contextTypes = {
    apiurl: PropTypes.string,
    token: PropTypes.string,
    getUserInfo: PropTypes.func
};

export default CreateSession;