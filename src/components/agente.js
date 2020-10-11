import React, { Component } from 'react';
import { AgenteService } from '../services/AgenteService';
import ProductividadAgente from './agente/ProductividadAgente'
import CrearAgente from './agente/CrearAgente'
import ListaAgente from './agente/ListaAgente'

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

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
        }

        this.items = [
            {
                label: 'Registrar',
                icon: 'pi pi-fw pi-plus-circle',
                command: () => { this.setState({ save: true, productividad: false }) }
            },
            {
                label: 'Buscar',
                icon: 'pi pi-fw pi-search',
                command: () => { this.setState({ productividad: false,isVisibleFind: true  }) }
            },
            {
                label: 'Productividad',
                icon: 'pi pi-fw pi-user',
                command: () => { this.setState({ save: false, productividad: true }) }
            }
        ];
        this.saveAgent = React.createRef();
        this.listAgent = React.createRef();
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
                        <CrearAgente ref={this.saveAgent} />
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
                    </Dialog>
                    <ListaAgente ref={this.listAgent} cedula={this.state.cedula}/>
            </div>
        )
    }
    
    findAgente = () => {
        if (this.state.cedula) {
            this.listAgent.current.updateListByAgente()
        }
    }

    save = () => {
        this.saveAgent.current.save()
        this.listAgent.current.updateList()
    }
}

export default Agente