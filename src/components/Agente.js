import React, { Component } from 'react';
import { AgenteService } from '../services/AgenteService';
import ProductividadAgente from './agente/ProductividadAgente'
import CrearAgente from './agente/CrearAgente'
import ListaAgente from './agente/ListaAgente'

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class Agente extends Component {

    constructor() {
        super();
        this.state = {
            save: false,
            productividad: false,
            isVisibleFind: false,
            cedula: null,
            listaVisible: true
        }

        this.items = [
            {
                label: 'Registrar/Editar',
                icon: 'pi pi-fw pi-plus-circle',
                command: () => { this.traerAgente(); this.setState({ save: true, productividad: false, listaVisible: true }) }
            },
            {
                label: 'Buscar',
                icon: 'pi pi-fw pi-search',
                command: () => { this.traerAgente(); this.setState({ productividad: false, isVisibleFind: true, listaVisible: true }) }
            },
            {
                label: 'Productividad',
                icon: 'pi pi-fw pi-user',
                command: () => { this.setState({ save: false, productividad: true, listaVisible: false }) }
            }
        ];
        this.saveAgent = React.createRef();
        this.lista = React.createRef();
        this.agenteService = new AgenteService();
    }

    componentDidMount() {
        this.agenteService.getAll().then(data => this.setState({ agentes: data }));
    }

    render() {

        return (
            <div className="card" style={{ width: '90%', marginTop: '20px', margin: '0 auto' }}>
                <Menubar model={this.items} />
                <Dialog header="Registrar agente" visible={this.state.save} style={{ width: '40%' }} modal={true} onHide={() => this.setState({ save: false })}>
                    <CrearAgente ref={this.saveAgent} data={this.state.cedula} />
                    <Button label="Gurdar" icon="pi pi-check" iconPos="right" onClick={this.save} />
                </Dialog>
                {this.state.productividad && < ProductividadAgente />}
                <Dialog header="Buscar agente" visible={this.state.isVisibleFind} valor={this.state.isVisibleFind} style={{ width: '40%' }} modal={true} onHide={() => this.setState({ isVisibleFind: false })}>
                    <br />
                    <span className="p-float-label">
                        <InputText style={{ width: "100%" }} value={this.state.cedula} id="cedula" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState => {
                                let cedula = Object.assign({}, prevState.conductor);
                                cedula = val;
                                return { cedula };
                            })
                        }} />
                        <label htmlFor="cedula">Cedula</label>
                    </span>
                    <br />
                    <Button label="Buscar" icon="pi pi-check" iconPos="right" onClick={this.findAgente} />
                    <br />
                    <Messages ref={(el) => this.messages = el}></Messages>
                </Dialog>
                {this.state.listaVisible && <ListaAgente ref={this.lista} cedula={this.state.cedula} />}
            </div>
        )
    }

    findAgente = () => {

        if (this.state.cedula) {
            this.showSuccess("Busqueda aceptada!")
            setTimeout(function () { //Start the timer  
                this.setState({ isVisibleFind: false })
                this.lista.current.updateListByAgente()
            }.bind(this), 1000)

        } else {
            this.showWarn("Ingrese una cedula!");
        }
    }

    save = () => {
        this.saveAgent.current.save()
        this.lista.current.updateList()
    }

    traerAgente = () => {

        if (this.lista.current != null) {
            var men = this.lista.current.getAgenteSelected()
            this.setState({ cedula: men.cedula })
        }
    }

    showSuccess(msm) {
        this.messages.show({ severity: 'success', summary: msm });
    }
    showWarn(msm) {
        this.messages.show({ severity: 'warn', summary: msm });
    }
}

export default Agente
