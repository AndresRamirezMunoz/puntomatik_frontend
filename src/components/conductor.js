import React, { Component } from 'react';
import CrearConductor from './conductor/CrearConductor'
import SaldoConductor from './conductor/SaldoConductor'
import ListaConductor from './conductor/ListaConductor';

import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

class Conductor extends Component {

    constructor(props) {
        super();
        this.state = {
            cedula: null,
            isVisibleConductor: false,
            isVisibleFind: false,
            isVisibleList: true,
            isVisibleSaldo: false
        }

        this.items = [
            {
                label: 'Registrar',
                icon: 'pi pi-fw pi-plus-circle',
                command: () => { this.setState({ isVisibleConductor: true, isVisibleFind: false, isVisibleSaldo: false }) }
            },
            {
                label: 'Buscar',
                icon: 'pi pi-fw pi-search',
                command: () => { this.setState({ isVisibleList: true, isVisibleFind: true, isVisibleSaldo: false }) }
            },
            {
                label: 'Consulta de saldo',
                icon: 'pi pi-fw pi-user',
                command: () => { this.setState({ isVisibleConductor: false, isVisibleFind: false, isVisibleList: false, isVisibleSaldo: true }); }
            }
        ];

        this.save = React.createRef();
        this.update = React.createRef();
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="card" style={{ width: '90%', marginTop: '20px', margin: '0 auto' }}>
                <div>
                    <Menubar model={this.items} />
                    <Dialog header="Registrar conductor" visible={this.state.isVisibleConductor} valor={this.state.isVisibleConductor} style={{ width: '40%' }} modal={true} onHide={() => this.setState({ isVisibleConductor: false })}>
                        {this.state.isVisibleConductor && <CrearConductor ref={this.save} />}
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
                    </Dialog>
                    {this.state.isVisibleList && <ListaConductor ref={this.update} cedula={this.state.cedula} />}
                    {this.state.isVisibleSaldo && <SaldoConductor visible={this.state.isVisibleConductor}/>}
                </div>
            </div >
        );
    }

    saveCoductor = () => {
        this.save.current.save()
        this.update.current.updateList()
    }
    findConductor = () => {
        if (this.state.cedula) {
            this.update.current.updateListByConductor()
        }

    }
}



export default Conductor