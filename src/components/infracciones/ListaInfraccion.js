import React, { Component } from 'react';
import { InfraccionService } from '../../services/InfraccionService';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

class ListaInfraccion extends Component {

    constructor(props) {
        super();
        this.state = {
            infracciones: []
        };
        this.infraccionService = new InfraccionService();
        this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    }


    componentDidMount() {

    }

    priceBodyTemplate(rowData) {
        return rowData.valor.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    pagaBodyTemplate(rowData) {
        return rowData.paga.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    render() {
        const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
        const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
        return (
            <Panel header="Infracciones">
                <DataTable value={this.state.infracciones} paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={20} rowsPerPageOptions={[10, 20, 50]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                    className="p-datatable-striped">
                    <Column field="cedulaConductor" header="Conductor"></Column>
                    <Column field="cedulaAgente" header="Agente"></Column>
                    <Column field="direccion" header="Direccion"></Column>
                    <Column field="fecha" header="Fecha"></Column>
                    <Column field="descripcion" header="Descripcion"></Column>
                    <Column field="valor" header="Valor" body={this.priceBodyTemplate} sortable></Column>
                    <Column field="paga" header="Paga" body={this.pagaBodyTemplate} sortable></Column>
                    <Column field="puntosPerdidos" header="Puntos perdidos"></Column>
                </DataTable>
            </Panel>
        )
    }
    updateList() {
        this.infraccionService.getAll().then(data => this.setState({ infracciones: data }));
    }

    updateListByConductor() {
        this.infraccionService.getConsultaByConductor(this.props.cedula).then(data => this.setState({ infracciones: data }));
    }

    updateListByDateRange() {
        let consulta=this.props.data;
        if (!this.isEmpty(consulta)) {
            this.infraccionService.getConsultaByDateRange(consulta).then(data => this.setState({ infracciones: data }));
        }
    }

    isEmpty(obj) {

        if (obj == null) return true;

        if (obj > 0) return false;
        if (obj === 0) return true;
        if (obj === undefined) return true;
        if (obj.length > 0) return false;

        if (typeof obj !== "object") return true;

        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }


}

export default ListaInfraccion
