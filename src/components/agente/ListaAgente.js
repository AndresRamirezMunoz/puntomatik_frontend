import React, { Component } from 'react';
import { AgenteService } from '../../services/AgenteService';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';

class ListaConductor extends Component {

    constructor() {
        super();
        this.state = {
            agentes: [],
            agenteSelected: {}
        }
        this.agenteService = new AgenteService();
    }

    componentDidMount() {
        this.agenteService.getAll().then(data => this.setState({ agentes: data }));
    }


    render() {
        const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
        const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
        return (
            <Panel header="Agentes">
                <DataTable value={this.state.agentes} paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={20} rowsPerPageOptions={[10, 20, 50]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} selectionMode="single" selection={this.state.conductorSelected} onSelectionChange={e => this.setState({ agenteSelected: e.value })}>
                    <Column field="cedula" header="Cedula"></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="apellido" header="Apellido"></Column>
                    <Column field="direccion" header="Direccion"></Column>
                    <Column field="salario" header="Salario"></Column>
                    <Column field="telefono" header="Telefono"></Column>
                </DataTable>
            </Panel>
        )
    }

    updateList() {
        //console.log("update_list")
         this.agenteService.getAll().then(data => this.setState({ agentes: data })); 
    }

    updateListByAgente() {
     //console.log("update_list_byCedula")
        this.agenteService.findByCedula( this.props.cedula).then(data => this.setState({ agentes: data })); 
    }

    getAgenteSelected() {
        let cedula = this.state.agenteSelected;
        this.setState({
            agenteSelected: {}
        })
        return cedula;
    }
}
export default ListaConductor