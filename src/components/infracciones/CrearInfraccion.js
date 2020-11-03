import React, { Component } from 'react';
import { InfraccionService } from '../../services/InfraccionService';
import { AgenteService } from '../../services/AgenteService';
import { ConductorService } from '../../services/ConductorService';


import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Messages } from 'primereact/messages';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


class CrearInfraccion extends Component {

    constructor() {
        super();
        this.state = {
            infraccion: {
                "id": null,
                "direccion": null,
                "fecha": null,
                "descripcion": null,
                "valor": null,
                "paga": null,
                "puntosPerdidos": null,
                "cedulaConductor": null,
                "cedulaAgente": null
            },
            agente: {
                "cedula": null,
                "nombre": null,
                "apellido": null,
                "telefono": null,
                "direccion": null,
                "salario": null
            }

        };

        this.infraccionesSelectItems = [
            { label: 'Estacionar en sitios prohibidos', value: 'Estacionar en sitios prohibidos' },
            { label: 'Exceso de velocidad', value: 'Exceso de velocidad' },
            { label: 'Revision tecnomecanica', value: 'Revision tecnomecanica' },
            { label: 'Transitar por sitios prohibidos', value: 'Transitar por sitios prohibidos' },
            { label: 'No portar licencia', value: 'No portar licencia' },
            { label: 'Soat vencido', value: 'Soat vencido' },
            { label: 'Conducir sin licencia', value: 'Conducir sin licencia' },
            { label: 'No detenerse en luz roja', value: 'No detenerse en luz roja' }
        ];

        this.infraccionService = new InfraccionService();
        this.agenteService = new AgenteService();
        this.conductorService = new ConductorService();
    }

    componentDidMount() {
    }

    render() {
        return (
            <form id="infracion-form">
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.infraccion.direccion} id="direccion" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let infraccion = Object.assign({}, prevState.infraccion);
                            infraccion.direccion = val;
                            return { infraccion };
                        })
                    }} />
                    <label htmlFor="direccion">Direccion</label>
                </span>
                <br />
                <Dropdown id="tipoMulta" style={{ width: "100%" }} value={this.state.infraccion.descripcion} options={this.infraccionesSelectItems} onChange={(e) => {
                    let val = e.target.value;
                    this.setState({ descripcion: val });
                    this.setState(prevState => {
                        let infraccion = Object.assign({}, prevState.infraccion);
                        infraccion.descripcion = val;
                        return { infraccion };
                    })
                }} placeholder="Tipo multa" />
                <br />
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.infraccion.cedulaAgente} id="cedulaA" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let infraccion = Object.assign({}, prevState.infraccion);
                            infraccion.cedulaAgente = val;
                            return { infraccion };
                        })
                    }} />
                    <label htmlFor="cedulaA">Cedula agente</label>
                </span>
                <br />
                <span className="p-float-label">
                    <InputText style={{ width: "100%" }} value={this.state.infraccion.cedulaConductor} id="cedulaC" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                            let infraccion = Object.assign({}, prevState.infraccion);
                            infraccion.cedulaConductor = val;
                            return { infraccion };
                        })
                    }} />
                    <label htmlFor="cedulaC">Cedula conductor</label>
                </span>
                <br />
                <Messages ref={(el) => this.messages = el}></Messages>
            </form>
        )
    }

    saveInfraccion() {

        document.getElementById("infracion-form").reset();
        let ccA = this.state.infraccion.cedulaAgente;
        this.agenteService.findByCedula(ccA).then(data => this.setState({ agente: data }));

        this.infraccionService.save(this.state.infraccion).then(data => { console.log(data) });
        this.setState({
            infraccion: {
                "id": null,
                "direccion": null,
                "fecha": null,
                "descripcion": null,
                "valor": null,
                "paga": null,
                "puntosPerdidos": null,
                "cedulaConductor": null,
                "cedulaAgente": null
            }
        });
        this.showSuccess('Registro exitoso!');

    }

    showSuccess(msm) {
        this.messages.show({ severity: 'success', summary: msm });
    }
    showWarn(msm) {
        this.messages.show({ severity: 'warn', summary: msm });
    }

}

export default CrearInfraccion
