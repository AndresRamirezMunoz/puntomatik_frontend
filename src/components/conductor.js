import React, { Component } from 'react';
import { ConductorService } from '../services/conductorService';
import CrearConductor from '../components/conductor/crearConductor'

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

class Conductor extends Component {

    constructor() {
        super();
        this.state = {
            save: false
        }

        this.items = [
            {
                label: 'Nuevo',
                icon: 'pi pi-fw pi-file',
                command: () => { this.showSaveDialog() }
            },
            {
                label: 'Buscar por conductor',
                icon: 'pi pi-fw pi-user',
                command: () => { this.showSearchConductorDialog() }
            }
        ];

        this.footerSave = (
            <div>
                <Button label="Guardar" icon="pi pi-check" iconPos="right" 
                onClick={() => { this.saveConductor(); this.updateList(); this.reset(); }} />
            </div>
        )

        this.conductorService = new ConductorService();
    }

    componentDidMount() {
        this.conductorService.getAll().then(data => this.setState({ conductores: data }));
    }

    render() {
        return (
            <div className="card" style={{ width: '90%', marginTop: '20px', margin: '0 auto' }}>
                <div>
                    <Menubar model={this.items} />
                    <Dialog header="Registrar conductor" visible={this.state.save} valor={this.state.save} style={{ width: '40%' }} footer={this.footerSave} modal={true} onHide={() => this.setState({ save: false })}>
                        <form id="conductor-form">
                            <CrearConductor shareMethods={this.acceptMethodsCreate} />
                        </form>
                    </Dialog>
                </div>
            </div>
        );
    }

    showSaveDialog() {
        this.setState({
            save: true
        })
    }

    reset() {
        document.getElementById("conductor-form").reset();
    }
    acceptMethodsCreate = (save) => {
        this.saveConductor = save;
    };
/**falta este metodo */
    acceptMethodsList = (update) => {
        this.updateList = update;
    };
}


export default Conductor