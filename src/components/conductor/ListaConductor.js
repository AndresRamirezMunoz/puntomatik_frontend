import React, { Component } from 'react';
import { ConductorService } from '../../services/ConductorService';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';

class ListaConductor extends Component {

    constructor() {
        super();
        this.state = {
            conductores: [],
            conductorSelected: {}

        }
        this.conductorService = new ConductorService();
    }

    componentDidMount() {
        this.conductorService.getAll().then(data => this.setState({ conductores: data }));
    }


    render() {
        const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
        const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
        return (
            <Panel header="Conductores">
                <DataTable value={this.state.conductores} paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={20} rowsPerPageOptions={[10, 20, 50]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                    className="p-datatable-striped" selectionMode="single" selection={this.state.conductorSelected} onSelectionChange={e => this.setState({ conductorSelected: e.value })}>
                    <Column field="cedula" header="Cedula"></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="apellido" header="Apellido"></Column>
                    <Column field="direccion" header="Direccion"></Column>
                    <Column field="telefono" header="Telefono"></Column>
                </DataTable>
            </Panel>
        )
    }

    updateList() {
        this.setState({
            conductorSelected: {
                "cedula": 0,
                "nombre": "",
                "apellido": "",
                "direccion": "",
                "puntos": "",
                "telefono": ""
            }
        })
        this.conductorService.getAll().then(data => this.setState({ conductores: data }));
    }
    updateListByConductor() {
        if (!this.isEmpty(this.props.cedula)) {
            this.conductorService.findByCedula(this.props.cedula).then(data => this.setState({ conductores: data }));
        }

    }

    getConductorSelected() {
        let cedula = this.state.conductorSelected;
        this.setState({
            conductorSelected: {}
        })
        return cedula;
    }

    isEmpty(obj) {

        if (obj == null) return true;

        if (obj.length > 0) return false;
        if (obj.length === 0) return true;

        if (typeof obj !== "object") return true;

        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }
}
export default ListaConductor