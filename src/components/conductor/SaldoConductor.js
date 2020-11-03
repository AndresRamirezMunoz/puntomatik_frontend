import React, { Component } from 'react';
import ListaInfraccion from '../infracciones/ListaInfraccion';

import { ConductorService } from '../../services/ConductorService';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Dialog } from 'primereact/dialog';

class SaldoConductor extends Component {

    constructor() {
        super();
        this.state = {
            cedula: "",
            isVisibleConductor: false,
            isVisiblePanel: false,
            conductor: {
                "cedula": null,
                "apellido": null,
                "direccion": null,
                "nombre": null,
                "puntos": null,
                "telefono": null
            }
        }
        this.list = React.createRef();
        this.conductorService = new ConductorService();
    }

    componentDidMount() {
    }

    render() {

        return (
            <div>
                { this.state.isVisiblePanel && <Panel style={{ width: '100%' }} modal={true}   >
                    <h4>{this.state.conductor.nombre} {this.state.conductor.apellido}, total puntos: {this.state.conductor.puntos}</h4>
                    <Dialog header="Buscar conductor" visible={this.state.isVisibleConductor} style={{ width: '40%' }} modal={true} onHide={() => this.setState({ isVisibleConductor: false })}>
                        <br />
                        <form id='form-cedula'>
                            <span className="p-float-label">
                                <InputText style={{ width: "100%" }} value={this.state.cedula} id="cedula" onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState(prevState => {
                                        let cedula = Object.assign({}, prevState.cedula);
                                        cedula = val;
                                        return { cedula };
                                    })
                                }} />
                                <label htmlFor="cedula">Cedula</label>
                            </span>
                        </form>
                        <div>
                            <br />
                            <Button label="Buscar" icon="pi pi-check" iconPos="right" onClick={this.searchDriver} />
                            <br />
                            <Messages ref={(el) => this.messages = el}></Messages>
                        </div>
                    </Dialog>
                    <ListaInfraccion cedula={this.state.cedula} ref={this.list} />
                </Panel >}
            </div>
        )
    }

    searchDriver = () => {

        if (this.state.cedula) {
            this.showSuccess("Busqueda aceptada!")
            setTimeout(function () { //Start the timer  
                this.list.current.updateListByConductor()
                this.conductorService.findByCedulaOne(this.state.cedula).then(data => this.setState({ conductor: data }));
                document.getElementById('form-cedula').reset();
                this.setState({ cedula: null, isVisibleConductor: false });
            }.bind(this), 1000)
        }
        else {
            this.showWarn("Ingrese una cedula!");
        }
    }

    showWarn(text) {
        this.messages.show({ severity: 'warn', detail: text });
    }
    showSuccess(msm) {
        this.messages.show({ severity: 'success', summary: msm });
    }
    isVisible(value) {
        this.setState({ isVisibleConductor: value, isVisiblePanel: value })
    }

    isEmpty(obj) {

        if (obj == null) return true;

        if (obj.length > 0) return false;
        if (obj.length === 0) return true;

        if (typeof obj !== "object") return true;

        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }



}
export default SaldoConductor