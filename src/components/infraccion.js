import React, { Component } from 'react';
import { InfraccionService } from '../services/infraccionService';
import ListaInfraccion from './infracciones/listaInfraccion';
import CrearInfraccion from './infracciones/crearInfraccion';


import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


class Infraccion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lista: true,
            save: false,
            conducor: false,
            cedulaC: null,
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
        };

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

        this.infraccionService = new InfraccionService();
        this.footerSave = (
            <div>
                <Button label="Guardar" icon="pi pi-check" iconPos="right" 
                onClick={() => { this.saveInfraccion(); this.updateList(); this.reset(); }} />
            </div>
        )
        this.footerConductor = (
            <div>
                <Button label="Buscar" icon="pi pi-check" iconPos="right" />
            </div>
        )
    }

    componentDidMount() {
        this.infraccionService.getAll().then(data => this.setState({ infracciones: data }));
    }

    render() {

        return (
            <div className="card" style={{ width: '90%', marginTop: '20px', margin: '0 auto' }}>
                <div>
                    <Menubar model={this.items} />

                    <Dialog header="Crear infraccion" visible={this.state.save} valor={this.state.save} style={{ width: '40%' }} footer={this.footerSave} modal={true} onHide={() => this.setState({ save: false })}>
                        <form id="infracion-form">
                            {this.state.save && <CrearInfraccion shareMethods={this.acceptMethodsCreate} />}
                        </form>
                    </Dialog>
                  
                    {this.state.lista && <ListaInfraccion shareMethods={this.acceptMethodsList} />}
                    <Dialog header="Buscar por conductor" visible={this.state.conducor} style={{ width: '40%' }} footer={this.footerConductor} modal={true} onHide={() => this.setState({ conducor: false })}>
                        <span className="p-float-label">
                            <InputText style={{ width: "100%" }} value={this.state.cedulaC} onChange={(e) => this.setState({ cedulaC: e.target.value })} />
                            <label htmlhtmlFor="in">Cedula del conductor</label>
                        </span>
                    </Dialog>
                </div>
            </div>
        )
    }

    showSaveDialog() {
        this.setState({
            save: true,
            conducor: false
        });
    }
       showSearchConductorDialog() {
        this.setState({
            save: false,
            conducor: true
        })
    }
    reset() {
        document.getElementById("infracion-form").reset();
    }


    acceptMethodsCreate = (save) => {
        this.saveInfraccion = save;
    };

    acceptMethodsList = (update) => {
        this.updateList = update;
    };

}

export default Infraccion
