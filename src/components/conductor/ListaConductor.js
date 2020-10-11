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
            conductores: []
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
                    className="p-datatable-striped">
                    <Column field="cedula" header="Cedula"></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="apellido" header="Apellido"></Column>
                    <Column field="direccion" header="Direccion"></Column>
                    <Column field="telefono" header="Telefono"></Column>
                    <Column field="puntos" header="Puntos"></Column>
                </DataTable>
            </Panel>
        )
    }

    updateList() {
        alert('Actulizar lista de conductores')
        /** this.conductorService.getAll().then(data => this.setState({ conductores: data })); */
    }
    updateListByConductor() {
        alert("Buscar cedula: "+this.props.cedula);
    }
}
export default ListaConductor