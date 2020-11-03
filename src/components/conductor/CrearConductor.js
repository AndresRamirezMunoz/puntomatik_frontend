import React, { Component } from 'react';

import { ConductorService } from '../../services/ConductorService';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';


class CrearConductor extends Component {

    constructor() {
        super();

        this.state = {
            conductor: {
                "cedula": "",
                "nombre": "",
                "apellido": "",
                "direccion": "",
                "puntos": "",
                "telefono": ""
            }
        }
        this.conductorService = new ConductorService();
    }

    componentDidMount() {
        if (!this.isEmpty(this.props.data)) {
            this.conductorService.findByCedulaOne(this.props.data).then(data => { this.setState({ conductor: data }) });
        }
    }

    render() {
        return (
            <div>
                <form id="conductor-form">
                    <br />
                    <span className="p-float-label">
                        <InputText style={{ width: "100%" }} value={this.state.conductor.cedula} id="cedula" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let conductor = Object.assign({}, prevState.conductor);
                                conductor.cedula = val;
                                return { conductor };
                            })
                        }} />
                        <label htmlFor="cedula">Cedula</label>
                    </span>
                    <br />
                    <span className="p-float-label">
                        <InputText style={{ width: "100%" }} value={this.state.conductor.nombre} id="nombre" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let conductor = Object.assign({}, prevState.conductor);
                                conductor.nombre = val;
                                return { conductor };
                            })
                        }} />
                        <label htmlFor="nombre">Nombre</label>
                    </span>
                    <br />
                    <span className="p-float-label">
                        <InputText style={{ width: "100%" }} value={this.state.conductor.apellido} id="apellido" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let conductor = Object.assign({}, prevState.conductor);
                                conductor.apellido = val;
                                return { conductor };
                            })
                        }} />
                        <label htmlFor="apellido">Apellido</label>
                    </span>
                    <br />
                    <span className="p-float-label">
                        <InputText style={{ width: "100%" }} value={this.state.conductor.direccion} id="direccion" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let conductor = Object.assign({}, prevState.conductor);
                                conductor.direccion = val;
                                return { conductor };
                            })
                        }} />
                        <label htmlFor="direccion">Direccion</label>
                    </span>
                    <br />
                    <span className="p-float-label">
                        <InputText style={{ width: "100%" }} value={this.state.conductor.telefono} id="telefono" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let conductor = Object.assign({}, prevState.conductor);
                                conductor.telefono = val;
                                return { conductor };
                            })
                        }} />
                        <label htmlFor="telefono">Telefono</label>
                    </span>
                    <br />
                    <Messages ref={(el) => this.messages = el}></Messages>
                </form>
            </div>
        )
    }


    save() {

        this.conductorService.save(this.state.conductor).then(data => { console.log(data) });
        this.showSuccess('Registro exitoso!');
        document.getElementById('conductor-form').reset();
        this.setState({
            conductor: {
                "cedula": "",
                "nombre": "",
                "apellido": "",
                "direccion": "",
                "puntos": "",
                "telefono": ""
            }
        });
    }

    showSuccess(msm) {
        this.messages.show({ severity: 'success', summary: msm });
    }
    showWarn(msm) {
        this.messages.show({ severity: 'warn', summary: msm });
    }
    
    isEmpty(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj > 0) return false;
        if (obj === 0) return true;
        if(obj===undefined) return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

}

export default CrearConductor
