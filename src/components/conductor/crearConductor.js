import React, { Component } from 'react';
import { ConductorService } from '../../services/conductorService';
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
        this.props.shareMethods(this.save.bind(this));
    }

    render() {
        return (
            <div>
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.conductor.cedula} id="cedula" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let conductor = Object.assign({}, prevState.agente);
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
                            let conductor = Object.assign({}, prevState.agente);
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
                            let conductor = Object.assign({}, prevState.agente);
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
                            let conductor = Object.assign({}, prevState.agente);
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
                            let conductor = Object.assign({}, prevState.agente);
                            conductor.telefono = val;
                            return { conductor };
                        })
                    }} />
                    <label htmlFor="telefono">Telefono</label>
                </span>
            </div>
        )
    }

    save() {
        
        this.conductorService.save(this.state.conductor).then(data => { console.log(data) });
        this.setState = ({
            conductor: {
                "cedula": null,
                "nombre": null,
                "apellido": null,
                "direccion": null,
                "puntos": null,
                "telefono": null
            }
        })
    }
}

export default CrearConductor