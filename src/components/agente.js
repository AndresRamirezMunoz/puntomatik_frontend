import React, { Component } from 'react';
import { AgenteService } from '../services/agenteService';
import ProductividadAgente from './agente/ProductividadAgente'
import CrearAgente from './agente/crearAgente'

import { Menubar } from 'primereact/menubar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';



import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class Agente extends Component {

    constructor() {
        super();
        this.state = {
            save: false,
            productividad: false,
            cedulaA: null,
        }
        this.footerSave = (
            <div>
                <Button label="Gurdar" icon="pi pi-check" iconPos="right"  onClick={() => { this.saveAgente();}}/>
            </div>
        )
        this.items = [
            {
                label: 'Nuevo',
                icon: 'pi pi-fw pi-file',
                command: () => { this.showSaveDialog() }
            },
            {
                label: 'Productividad',
                icon: 'pi pi-fw pi-user',
                command: () => { this.showPructividad() }
            }
        ];
        this.agenteService = new AgenteService();
    }

    componentDidMount() {
        this.agenteService.getAll().then(data => this.setState({ agentes: data }));
    }

    render() {
        const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
        const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
        return (
            <div className="card" style={{ width: '90%', marginTop: '20px', margin: '0 auto' }}>
                <div>
                    <Menubar model={this.items}/>
                    {this.state.productividad && < ProductividadAgente />}
                    <Dialog header="Registrar agente" visible={this.state.save} style={{ width: '40%' }} footer={this.footerSave} modal={true} onHide={() => this.setState({ save: false })}>
                        <form id='creargente-form'>
                            {this.state.save && <CrearAgente shareMethods={this.acceptMethodsCreate} />}
                        </form>
                    </Dialog>
                </div>
                <div>
                    <Panel header="Agentes">
                        <DataTable value={this.state.agentes} paginator
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={20} rowsPerPageOptions={[10, 20, 50]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                            <Column field="cedula" header="Cedula"></Column>
                            <Column field="nombre" header="Nombre"></Column>
                            <Column field="apellido" header="Apellido"></Column>
                            <Column field="direccion" header="Direccion"></Column>
                            <Column field="salario" header="Salario"></Column>
                            <Column field="telefono" header="Telefono"></Column>
                        </DataTable>
                    </Panel>
                </div>
            </div>
        )
    }

    showSaveDialog() {
        this.setState({ save: true })
    }
    showPructividad() {
        this.setState({ productividad: true })
    }

    acceptMethodsCreate = (save) => {
        // Parent stores the method that the child passed
        this.saveAgente = save;
    };
}

export default Agente