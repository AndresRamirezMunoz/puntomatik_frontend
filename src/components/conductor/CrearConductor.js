import React, { Component } from 'react';

import { ConductorService } from '../../services/ConductorService';
import { InputText } from 'primereact/inputtext';

class CrearConductor extends Component {

    constructor() {
        super();

        this.state = {
            conductor: {
                "cedula": null,
                "nombre": null,
                "apellido": null,
                "direccion": null,
                "puntos": null,
                "telefono": null
            }
        }
        this.conductorService = new ConductorService();
    }

    componentDidMount() {

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
                </form>
            </div>
        )
    }


    save() {
        alert('Registrar conductor')
        /*this.conductorService.save(this.state.conductor).then(data => { console.log(data) });*/
        document.getElementById('conductor-form').reset();
        this.setState({
            conductor: {
                "cedula": null,
                "nombre": null,
                "apellido": null,
                "direccion": null,
                "puntos": null,
                "telefono": null
            }
        });
    }

}

export default CrearConductor
