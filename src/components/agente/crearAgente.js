import React, { Component } from 'react';
import { AgenteService } from '../../services/agenteService';
import { InputText } from 'primereact/inputtext';

class CrearAgente extends Component {

    constructor() {
        super();
        this.state = {
            agente: {
                "cedula": null,
                "nombre": null,
                "apellido": null,
                "direccion": null,
                "salario": null,
                "telefono": null
            }
        }
        this.agenteServices = new AgenteService();
    }

    componentDidMount() {
        this.props.shareMethods(this.save.bind(this));
    }

    render() {
        return (
            <div>
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.agente.cedula} id="cedula" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let agente = Object.assign({}, prevState.agente);
                            agente.cedula = val;
                            return { agente };
                        })
                    }} />
                    <label htmlFor="cedula">Cedula</label>
                </span>
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.agente.nombre} id="nombre" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let agente = Object.assign({}, prevState.agente);
                            agente.nombre = val;
                            return { agente };
                        })
                    }} />
                    <label htmlFor="nombre">Nombre</label>
                </span>
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.agente.apellido} id="apellido" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let agente = Object.assign({}, prevState.agente);
                            agente.apellido = val;
                            return { agente };
                        })
                    }} />
                    <label htmlFor="apellido">Apellido</label>
                </span>
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.agente.direccion} id="direccion" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let agente = Object.assign({}, prevState.agente);
                            agente.direccion = val;
                            return { agente };
                        })
                    }} />
                    <label htmlFor="direccion">Direccion</label>
                </span>
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.agente.salario} id="salario" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let agente = Object.assign({}, prevState.agente);
                            agente.salario = val;
                            return { agente };
                        })
                    }} />
                    <label htmlFor="salario">Salario</label>
                </span>
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.agente.telefono} id="telefono" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let agente = Object.assign({}, prevState.agente);
                            agente.telefono = val;
                            return { agente };
                        })
                    }} />
                    <label htmlFor="telefono">Telefono</label>
                </span>
            </div>
        )
    }

    save() {
        console.log('crear agente')
    }
}

export default CrearAgente