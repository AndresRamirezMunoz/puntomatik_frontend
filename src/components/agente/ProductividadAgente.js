import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ListaInfraccion from '../infracciones/ListaInfraccion';

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
            consulta: "",
            cedulaC: null,
            cedulaA: null,
            dateStart: null,
            dateEnd: null,
        };

        this.buscarInfraccion = this.buscarInfraccion.bind(this);
        this.lista = React.createRef();
    }

    componentDidMount() {

    }

    render() {
        return (
            <Panel header="Productividad" style={{ width: '100%' }} footer={this.footerAgente} modal={true} onHide={() => this.setState({ agente: false })}>

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
                <ListaInfraccion ref={this.lista}  data={this.state.consulta} />
            </Panel>

        )
    }

    buscarInfraccion = () => {
        let inicio = this.organizarFecha(this.state.dateStart.toLocaleDateString());
        let fin = this.organizarFecha(this.state.dateEnd.toLocaleDateString());
        let cedula = this.state.cedulaA;
        let myconsulta = inicio + "_" + fin + "_" + cedula;
        this.setState({ consulta: myconsulta})
        if (this.lista.current != null) {
            this.lista.current.updateListByDateRange();
        }
    }

    organizarFecha(fecha) {
        for (let i = 0; i < 2; i++) { fecha = fecha.replace("/", "-") }
        var divisiones = fecha.split("-", 3);
        fecha = divisiones[2] + "-" + divisiones[1] + "-" + divisiones[0]
        return fecha;
    }
}

export default ProductividadAgente;
ReactDOM.render(<ListaInfraccion />, document.getElementById('root'));