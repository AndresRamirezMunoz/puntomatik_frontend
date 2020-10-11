import React, { Component } from 'react';
import { VehiculoService } from '../services/VehiculoService';
import CrearVehiculo from './Vehiculo/CrearVehiculo'
import ListaVehiculo from './Vehiculo/ListaVehiculo'

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

class Vehiculo extends Component {

    constructor() {
        super();
        this.state = {
            save: false,
            cedula: null
            
        };
        this.items = [
            {
                label: 'Registrar',
                icon: 'pi pi-fw pi-plus-circle',
                command: () => { this.setState({ save: true }) }
            },
            {
                label: 'Buscar',
                icon: 'pi pi-fw pi-search',
                command: () => { this.setState({ isVisibleFind: true }) }
            }
        ];
        this.saveVehiculo = React.createRef();
        this.listVehiculo = React.createRef();
        this.vehiculoService = new VehiculoService();
    }

    componentDidMount() {
   
    }

    render() {

        return (
            <div className="card" style={{ width: '90%', marginTop: '20px', margin: '0 auto' }}>

                <Menubar model={this.items} />
             

                <Dialog header="Registrar vehiculo" visible={this.state.save} style={{ width: '40%' }} footer={this.footerSave} modal={true} onHide={() => this.setState({ save: false })}>
                    <CrearVehiculo ref={this.saveVehiculo}/>
                    <Button label="Gurdar" icon="pi pi-check" iconPos="right" onClick={this.save} />
                </Dialog>
                <Dialog header="Buscar por cedula" visible={this.state.isVisibleFind} style={{ width: '40%' }} footer={this.footerAgente} modal={true} onHide={() => this.setState({ isVisibleFind: false })}>
                    <span className="p-float-label">
                        <InputText style={{ width: "100%" }} value={this.state.cedula} onChange={(e) => this.setState({ cedula: e.target.value })} />
                        <label htmlhtmlFor="in">Cedula del propietario</label>
                    </span>
                    <br />
                    <Button label="Buscar" icon="pi pi-check" iconPos="right" onClick={this.updateByCedula}  />
                </Dialog>
                <ListaVehiculo ref={this.listVehiculo} cedula={this.state.cedula}/>
            </div>
        )
    }

    save = () => {
        this.saveVehiculo.current.save();
        this.listVehiculo.current.updateList()
    }

    updateByCedula = () => {
        this.listVehiculo.current.updateByCedula()
        this.setState({
            isVisibleFind: false,
            cedula: null
        })
    }


}



export default Vehiculo