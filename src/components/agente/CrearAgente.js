import React, { Component } from 'react';
import { AgenteService } from '../../services/AgenteService';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';

class CrearAgente extends Component {

    constructor() {
        super();
        this.state = {
            agente: {
                "cedula": "",
                "nombre": "",
                "apellido": "",
                "direccion": "",
                "salario": "",
                "telefono": ""
            }
        }
        this.agenteService = new AgenteService();
    }

    componentDidMount() {
        if (!this.isEmpty(this.props.data)) {
            this.agenteService.findByCedulaOne(this.props.data).then(data => { this.setState({ agente: data }) });
        }
    }

    render() {
        return (
            <form id='agente-form'>
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.agente.cedula} id="cedula" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let agente = Object.assign({}, prevState.agente);
                            agente.cedula = val;
                            return { agente };
                        })
                    }} /><label htmlFor="cedula">Cedula</label>
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
                    }} /><label htmlFor="nombre">Nombre</label>
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
                    }} /><label htmlFor="apellido">Apellido</label>
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
                    }} /><label htmlFor="direccion">Direccion</label>
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
                    }} /><label htmlFor="salario">Salario</label>
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
                    }} /><label htmlFor="telefono">Telefono</label>
                </span>
                <br />
                <Messages ref={(el) => this.messages = el}></Messages>
            </form>
        )
    }

    save() {

        this.agenteService.save(this.state.agente).then(data => { console.log(data) });
        this.showSuccess('Registro exitoso!');
        document.getElementById('agente-form').reset();
        this.setState({
            agente: {
                "cedula": "",
                "nombre": "",
                "apellido": "",
                "direccion": "",
                "salario": "",
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

        if (obj == null) return true;

        if (obj > 0) return false;
        if (obj === 0) return true;
        if (obj === undefined) return true;

        if (typeof obj !== "object") return true;

        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

}

export default CrearAgente
