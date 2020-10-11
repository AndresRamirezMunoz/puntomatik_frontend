import React, { Component } from 'react';
import ListaInfraccion from '../infracciones/ListaInfraccion';

import { ConductorService } from '../../services/ConductorService';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Dialog } from 'primereact/dialog';

class SaldoConductor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cedula: null,
            isVisibleConductor: this.props.visible,
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
            <Panel header="Buscar saldo conductor" style={{ width: '100%' }} modal={true} >
                <Dialog header="Buscar conductor" visible={this.state.isVisibleConductor} valor={this.state.isVisibleConductor} style={{ width: '40%' }} modal={true} onHide={() => this.setState({ isVisibleConductor: false })}>
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

                    <div className="p-col">
                        <Button label="Buscar" icon="pi pi-check" iconPos="right" onClick={this.searchDriver} />
                    </div>
                    <div className="p-col">
                        <Messages ref={(el) => this.messages = el}></Messages>
                    </div>
                </Dialog>
                <ListaInfraccion cedula={this.state.cedula} ref={this.list} />
            </Panel >
        )
    }

    searchDriver = () => {

        if (!this.state.cedula) {
            this.setState({ cedula: null });
            document.getElementById('form-cedula').reset();
            this.list.current.updateListByConductor()
        }
        else {
            this.showWarn("Ingrese una cedula!");
        }
    }

    showWarn(text) {
        this.messages.show({ severity: 'warn', detail: text });
    }


}
export default SaldoConductor