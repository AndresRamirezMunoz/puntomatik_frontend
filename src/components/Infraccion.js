import React, { Component } from 'react';
import ListaInfraccion from './infracciones/ListaInfraccion';
import CrearInfraccion from './infracciones/CrearInfraccion';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


class Infraccion extends Component {

    constructor(props) {
        super();
        this.state = {
            isSaveConductor: false,
        };

        this.items = [
            {
                label: 'Registrar',
                icon: 'pi pi-fw pi-plus-circle',
                command: () => { this.setState({ isSaveConductor: true }); }
            }
        ];
        this.saveInfraccion = React.createRef();
        this.listInfraccion = React.createRef();
    }

    componentDidMount() {
        if(this.listInfraccion.current!=null){
            this.listInfraccion.current.updateList()
        }
    }

    render() {
        return (
            <div className="card" style={{ width: '90%', marginTop: '20px', margin: '0 auto' }}>
                <div>
                    <Menubar model={this.items} />
                    <Dialog header="Crear infraccion" visible={this.state.isSaveConductor} valor={this.state.isSaveConductor} style={{ width: '40%' }} modal={true} onHide={() => this.setState({ isSaveConductor: false })}>
                        <CrearInfraccion ref={this.saveInfraccion} />
                        <Button label="Guardar" icon="pi pi-check" iconPos="right" onClick={this.save} />
                    </Dialog>
                    <ListaInfraccion ref={this.listInfraccion} />
                </div>
            </div>
        )
    }
    save = () => {
        this.saveInfraccion.current.saveInfraccion()
        this.listInfraccion.current.updateList()
    }

    showList(){
        this.listInfraccion.current.updateList()
    }

    
}

export default Infraccion
