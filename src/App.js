import React, { Component } from 'react';
import './App.css';
import Infraccion from './components/infraccion'

import { Menubar } from 'primereact/menubar';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component {

  constructor() {
    super();
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
        <Infraccion />
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

}


