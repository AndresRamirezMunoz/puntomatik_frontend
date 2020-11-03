import React, { Component } from 'react';
import { VehiculoService } from '../services/VehiculoService';
import CrearVehiculo from './Vehiculo/CrearVehiculo'
import ListaVehiculo from './Vehiculo/ListaVehiculo'

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

class Vehiculo extends Component {

    constructor() {
        super();
        this.state = {
            save: false,
            cedula: null,
            idVehiculo: null

        };
        this.items = [
            {
                label: 'Registrar/Editar',
                icon: 'pi pi-fw pi-plus-circle',
                command: () => { this.setState({ save: true }); this.traerVehiculo() }
            },
            {
                label: 'Buscar',
                icon: 'pi pi-fw pi-search',
                command: () => { this.setState({ isVisibleFind: true }) }
            }
        ];
        this.saveVehiculo = React.createRef();
        this.lista = React.createRef();
        this.vehiculoService = new VehiculoService();
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="card" style={{ width: '90%', marginTop: '20px', margin: '0 auto' }}>

                <Menubar model={this.items} />


                <Dialog header="Registrar vehiculo" visible={this.state.save} style={{ width: '40%' }} footer={this.footerSave} modal={true} onHide={() => this.setState({ save: false })}>
                    <CrearVehiculo ref={this.saveVehiculo} idVehiculo={this.state.idVehiculo} />
                    <Button label="Gurdar" icon="pi pi-check" iconPos="right" onClick={this.save} />
                </Dialog>
                <Dialog header="Cedula por propietario" visible={this.state.isVisibleFind} style={{ width: '40%' }} footer={this.footerAgente} modal={true} onHide={() => this.setState({ isVisibleFind: false })}>
                    <span className="p-float-label">
                        <InputText style={{ width: "100%" }} value={this.state.cedula} onChange={(e) => this.setState({ cedula: e.target.value })} />
                        <label htmlhtmlFor="in">Cedula del propietario</label>
                    </span>
                    <br />
                    <Button label="Buscar" icon="pi pi-check" iconPos="right" onClick={this.updateByCedula} />
                    <br />
                    <Messages ref={(el) => this.messages = el}></Messages>
                </Dialog>
                <ListaVehiculo ref={this.lista} cedula={this.state.cedula} />
            </div>
        )
    }


    updateByCedula = () => {

        if (this.state.cedula) {
            this.showSuccess("Busqueda aceptada!")
            setTimeout(function () { //Start the timer  
                this.lista.current.updateListByPropietario()
                this.setState({ isVisibleFind: false, cedula:null })
            }.bind(this), 1000)

        } else {
            this.showWarn("Ingrese una cedula!");
        }
    }

    save = () => {
        this.saveVehiculo.current.save();
        this.lista.current.updateList()
    }


    traerVehiculo = () => {
        if (this.lista.current != null) {
            var men = this.lista.current.getVehiculoSelected()
            this.setState({ idVehiculo: men.id })
        }
    }
    showSuccess(msm) {
        this.messages.show({ severity: 'success', summary: msm });
    }
    showWarn(msm) {
        this.messages.show({ severity: 'warn', summary: msm });
    }

}



export default Vehiculo