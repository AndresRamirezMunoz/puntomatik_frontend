import React, { Component } from 'react';
import Infraccion from './Infraccion'
import Agente from './Agente'
import Conductor from './Conductor'
import Vehiculo from './Vehiculo'
import { Menubar } from 'primereact/menubar';


class Aplicativo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infracciones: false,
            agente: false,
            conductor: false,
            vehiculo: false
        };
        this.items = [
            {
                label: 'Infraccion',
                icon: 'pi pi-fw pi-file',
                command: () => { this.showInfracciones() }
            },
            {
                label: 'Agente',
                icon: 'pi pi-fw pi-user',
                command: () => { this.showAgente() }
            },
            {
                label: 'Conductor',
                icon: 'pi pi-fw pi-user',
                command: () => { this.showConductor() }
            },
            {
                label: 'Vehiculo',
                icon: 'pi pi-fw pi-align-center',
                command: () => { this.showVehiculo() }
            },
            {
                label:'Salir',
                icon:'pi pi-fw pi-power-off',
                command: () => { this.showConductorSolo() }
             }
        ]
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Menubar model={this.items} />
                <br />
                {this.state.infracciones && <Infraccion />}
                {this.state.agente && <Agente />}
                {this.state.conductor && <Conductor />}
                {this.state.vehiculo && <Vehiculo />}
            </div>
        );
    }
    showInfracciones() {
        this.setState({
            infracciones: true,
            agente: false,
            conductor: false,
            vehiculo: false
        })
    }
    showAgente() {
        this.setState({
            infracciones: false,
            agente: true,
            conductor: false,
            vehiculo: false
        })
    }
    showConductor() {
        this.setState({
            infracciones: false,
            agente: false,
            conductor: true,
            vehiculo: false
        })
    }
    showVehiculo() {
        this.setState({
            infracciones: false,
            agente: false,
            conductor: false,
            vehiculo: true
        })
    }

    showConductorSolo() {
      this.props.conductorSolo(false)
    }
}
export default Aplicativo
