import React, { Component } from 'react';
import './App.css';
import Aplicativo from './components/Aplicativo'
import SoloConductor from './components/SoloConductor'
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { Password } from 'primereact/password';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      conductor: false,
      conductorSolo: true,
      isVisibleSesion: false,
      usuario: "",
      password: ""
    };

    this.items = [
      {
        label: 'Iniciar sesion',
        icon: 'pi pi-fw pi-lock',
        command: () => { this.showInicionSesion() }
      }
    ]
    this.showConductorSolo = this.showConductorSolo.bind(this)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div>
          {this.state.conductorSolo && <Menubar model={this.items} />}
        </div>

        <div>
          {this.state.conductor && <Aplicativo conductorSolo={this.showConductorSolo} />}
          {this.state.conductorSolo && <SoloConductor />}
          <Dialog header="Iniciar Sesion" visible={this.state.isVisibleSesion} valor={this.state.isVisibleFind} style={{ width: '40%' }} modal={true} onHide={() => this.setState({ isVisibleSesion: false })}>
            <br />
            <span className="p-float-label">
              <InputText style={{ width: "100%" }} value={this.state.usuario} id="cedula" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let usuario = Object.assign({}, prevState.usuario);
                  usuario = val;
                  return { usuario };
                })
              }} />
              <label htmlFor="Usuario">Usuario</label>
            </span>
            <br /> <br />
            <span className="p-float-label">
              <Password  style={{ width: "100%" }}  value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
              <label htmlFor="Contraseña">Contraseña</label>
            </span>
            <br />
            <Button label="Entrar" icon="pi pi-check" iconPos="right" onClick={this.verificrInicionSesion} />
            <br />
            <Messages ref={(el) => this.messages = el}></Messages>
          </Dialog>
        </div>
      </div>
    );
  }


  verificrInicionSesion = () => {

    let usuario = this.state.usuario
    let password = this.state.password
    if (usuario === "Admin" && password === "1234") {
      this.showSuccess("Bienvenido!")
      setTimeout(function () { //Start the timer  
        this.setState({ isVisibleFind: false })
        this.setState({
          conductor: true,
          conductorSolo: false,
          isVisibleSesion: false,
          usuario: "",
          password: ""
        })
      }.bind(this), 1000)
    } else {
      this.showWarn("Datos incorrectos!")
    }
  }

  showInicionSesion = () => {
    this.setState({ isVisibleSesion: true })
  }

  showConductorSolo(flag) {
    this.setState({
      conductor: flag,
      conductorSolo: !flag
    })
  }

  showSuccess(msm) {
    this.messages.show({ severity: 'success', summary: msm });
  }
  showWarn(msm) {
    this.messages.show({ severity: 'warn', summary: msm });
  }
}
