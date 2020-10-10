import React, { Component } from 'react';
import { InfraccionService } from '../../services/infraccionService';

import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


class ProductividadAgente extends Component {

    constructor() {
        super();
        this.state = {
            cedulaC: null,
            cedulaA: null,
            dateStart: null,
            dateEnd: null,
        };

        this.buscarInfraccion = this.buscarInfraccion.bind(this);
        this.infraccionService = new InfraccionService();
    }

    componentDidMount() {
        this.infraccionService.getAll().then(data => this.setState({ infracciones: data }));

    }

    render() {
        return (
            <Panel header="Productividad" visible={this.state.agente} style={{ width: '100%' }} footer={this.footerAgente} modal={true} onHide={() => this.setState({ agente: false })}>

                <div className="p-grid">
                    <div className="p-col">
                        <span className="p-float-label" >
                            <Calendar value={this.state.dateStart} onChange={(e) => this.setState({ dateStart: e.value })} monthNavigator yearNavigator yearRange="2000:2020" />
                            <label htmlFor="Fechainicio">Fecha inicio</label>
                        </span>
                    </div>

                    <div className="p-col">
                        <span className="p-float-label" >
                            <Calendar value={this.state.dateEnd} onChange={(e) => this.setState({ dateEnd: e.value })} monthNavigator yearNavigator yearRange="2000:2020" />
                            <label htmlFor="Fechafin">Fecha fin</label>
                        </span>
                    </div>

                    <div className="p-col">
                        <span className="p-float-label">
                            <InputText value={this.state.cedulaA} onChange={(e) => this.setState({ cedulaA: e.target.value })} />
                            <label htmlhtmlFor="in">Cedula del agente</label>
                        </span>
                    </div>
                    <Button label="Buscar" icon="pi pi-search" iconPos="right" onClick={this.buscarInfraccion} />
                </div>

            </Panel>

        )
    }

    buscarInfraccion() {
        let consulta = this.state.dateStart + '#' + this.state.dateEnd + '#' + this.state.cedulaA
        console.log(consulta)
        this.infraccionService.getConsultaByDateRange(consulta).then(data => this.setState({ infracciones: data }));
    }
}

export default ProductividadAgente