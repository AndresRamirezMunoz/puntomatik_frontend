import React, { Component } from 'react';
import { VehiculoService } from '../../services/VehiculoService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';


class ListaVehiculo extends Component {
    constructor() {
        super();
        this.state = {
            vehiculo: [],
            vehiculoSelected: {}
        }

        this.vehiculoService = new VehiculoService();
    }

    componentDidMount() {
        this.vehiculoService.getAll().then(data => this.setState({ vehiculos: data }));
    }

    render() {
        const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
        const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
        return (
            <Panel header="Vehiculos">
                <DataTable value={this.state.vehiculos} paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={20} rowsPerPageOptions={[10, 20, 50]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} selectionMode="single" selection={this.state.vehiculoSelected} onSelectionChange={e => this.setState({ vehiculoSelected: e.value })}>
                    <Column field="cilindraje" header="CC"></Column>
                    <Column field="combustible" header="Tipo motor"></Column>
                    <Column field="marca" header="Marca"></Column>
                    <Column field="modelo" header="Modelo"></Column>
                    <Column field="numeroChasis" header="Chasis"></Column>
                    <Column field="numeroPasajeros" header="Pasajeros"></Column>
                    <Column field="placa" header="Placa"></Column>
                    <Column field="propiestario" header="CC"></Column>
                    <Column field="tipoVehiculo" header="Tipo vehiculo"></Column>
                </DataTable>
            </Panel>
        )
    }
    updateList() {
        this.vehiculoService.getAll().then(data => this.setState({ vehiculos: data }));
    }

    updateListByPropietario() {
        this.vehiculoService.getConsultaByConductor(this.props.cedula).then(data => this.setState({ vehiculos: data }));
    }

    getVehiculoSelected() {
        let vehiculo = this.state.vehiculoSelected;
        this.setState({
            vehiculoSelected: {}
        })
        return vehiculo;
    }
}

export default ListaVehiculo