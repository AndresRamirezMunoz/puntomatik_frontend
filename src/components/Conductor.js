import React, { Component } from 'react';
import CrearConductor from './conductor/CrearConductor'
import SaldoConductor from './conductor/SaldoConductor'
import ListaConductor from './conductor/ListaConductor';
import { ConductorService } from '../services/ConductorService';

import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';

class Conductor extends Component {

    constructor() {
        super();
        this.state = {
            cedula: "",
            isVisibleConductor: false,
            isVisibleFind: false,
            isVisibleList: true,
            isVisibleSaldo: false
        }

        this.items = [
            {
                label: 'Registrar/Editar',
                icon: 'pi pi-fw pi-plus-circle',
                command: () => { this.traerConductor(); this.visibleSaldo(false); this.setState({ isVisibleConductor: true, isVisibleList: true, isVisibleFind: false, isVisibleSaldo: false }); }
            },
            {
                label: 'Buscar',
                icon: 'pi pi-fw pi-search',
                command: () => { this.traerConductor(); this.visibleSaldo(false); this.setState({ isVisibleList: true, isVisibleFind: true, isVisibleSaldo: false }) }
            },
            {
                label: 'Consulta de saldo',
                icon: 'pi pi-fw pi-user',
                command: () => { this.visibleSaldo(true); this.setState({ isVisibleConductor: false, isVisibleFind: false, isVisibleList: false, isVisibleSaldo: true }); }
            }
        ];

        this.save = React.createRef();
        this.lista = React.createRef();
        this.updateSaldo = React.createRef();
        this.conductorService = new ConductorService();
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="card" style={{ width: '90%', marginTop: '20px', margin: '0 auto' }}>
                <div>
                    <Menubar model={this.items} />
                    <Dialog header="Registrar conductor" visible={this.state.isVisibleConductor} valor={this.state.isVisibleConductor} style={{ width: '40%' }} modal={true} onHide={() => this.setState({ isVisibleConductor: false })}>
                        <CrearConductor ref={this.save} data={this.state.cedula} />
                        <Button label="Guardar" icon="pi pi-check" iconPos="right" onClick={this.saveCoductor} />
                    </Dialog>
                    <Dialog header="Buscar conductor" visible={this.state.isVisibleFind} valor={this.state.isVisibleFind} style={{ width: '40%' }} modal={true} onHide={() => this.setState({ isVisibleFind: false })}>
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
                        <Button label="Buscar" icon="pi pi-check" iconPos="right" onClick={this.findConductor} />
                        <br />
                        <Messages ref={(el) => this.messages = el}></Messages>
                    </Dialog>
                    {this.state.isVisibleList && <ListaConductor id="lista" ref={this.lista} cedula={this.state.cedula} />}
                    <SaldoConductor ref={this.updateSaldo} />
                </div>
            </div >
        );

    }

    visibleSaldo = (value) => {
        this.updateSaldo.current.isVisible(value)
    }


    traerConductor = () => {

        if (this.lista.current != null) {
            this.lista.current.updateList()
            var men = this.lista.current.getConductorSelected()
            this.setState({ cedula: men.cedula })
        }
    }

    saveCoductor = () => {
        this.save.current.save()
        this.lista.current.updateList()
        this.setState({
            cedula: ""
        })
    }
    findConductor = () => {

        if (this.state.cedula ) {
            this.showSuccess("Busqueda aceptada!")
            setTimeout(function () { //Start the timer  
                this.setState({ isVisibleFind: false })
                this.lista.current.updateListByConductor()
            }.bind(this), 1000)

        } else {
            this.showWarn("Ingrese una cedula!");
        }

    }
    isEmpty(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }
    showWarn(msm) {
        this.messages.show({ severity: 'warn', summary: msm });
    }
    showSuccess(msm) {
        this.messages.show({ severity: 'success', summary: msm });
    }
    isVisible(value) {
        this.setState({ isVisibleConductor: value, isVisiblePanel: value })
    }
}



export default Conductor
