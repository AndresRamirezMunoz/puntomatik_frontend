import React, { Component } from 'react';
import { VehiculoService } from '../../services/VehiculoService';


import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

class CrearVehiculo extends Component {
    constructor() {
        super();
        this.state = {
            vehiculo: {
                "id": null,
                "placa": null,
                "numeroChasis": null,
                "combustible": null,
                "cilindraje": null,
                "numeroPasajeros": null,
                "marca": null,
                "modelo": null,
                "tipoVehiculo": null,
                "propiestario": null
            }
        };

        this.tipoVehiculoSelectItems = [
            { label: 'auto', value: 'auto' },
            { label: 'moto', value: 'moto' },
        ];

        this.vehiculoService = new VehiculoService();
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="p-grid">
                    <div className="p-col-6">
                        <br />
                        <span className="p-float-label">
                            <InputText style={{ width: "100%" }} value={this.state.vehiculo.cilindraje} id="cilindraje" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let vehiculo = Object.assign({}, prevState.vehiculo);
                                    vehiculo.cilindraje = val;
                                    return { vehiculo };
                                })
                            }} />
                            <label htmlFor="cilindraje">Cilindraje</label>
                        </span>
                    </div>
                    <div className="p-col-6">
                        <br />
                        <span className="p-float-label">
                            <InputText style={{ width: "100%" }} value={this.state.vehiculo.combustible} id="combustible" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let vehiculo = Object.assign({}, prevState.vehiculo);
                                    vehiculo.combustible = val;
                                    return { vehiculo };
                                })
                            }} />
                            <label htmlFor="combustible">Combustible</label>
                        </span>
                    </div>
                    <div className="p-col-6">
                        <br />
                        <span className="p-float-label">
                            <InputText style={{ width: "100%" }} value={this.state.vehiculo.combustible} id="marca" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let vehiculo = Object.assign({}, prevState.vehiculo);
                                    vehiculo.marca = val;
                                    return { vehiculo };
                                })
                            }} />
                            <label htmlFor="marca">Marca</label>
                        </span>
                    </div>
                    <div className="p-col-6">
                        <br />
                        <span className="p-float-label">
                            <InputText style={{ width: "100%" }} value={this.state.vehiculo.combustible} id="modelo" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let vehiculo = Object.assign({}, prevState.vehiculo);
                                    vehiculo.modelo = val;
                                    return { vehiculo };
                                })
                            }} />
                            <label htmlFor="modelo">Modelo</label>
                        </span>
                    </div>
                    <div className="p-col-6">
                        <br />
                        <span className="p-float-label">
                            <InputText style={{ width: "100%" }} value={this.state.vehiculo.numeroChasis} id="numeroChasis" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let vehiculo = Object.assign({}, prevState.vehiculo);
                                    vehiculo.numeroChasis = val;
                                    return { vehiculo };
                                })
                            }} />
                            <label htmlFor="numeroChasis">Numero chasis</label>
                        </span>
                    </div>
                    <div className="p-col-6">
                        <br />
                        <span className="p-float-label">
                            <InputText style={{ width: "100%" }} value={this.state.vehiculo.numeroPasajeros} id="numeroPasajeros" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let vehiculo = Object.assign({}, prevState.vehiculo);
                                    vehiculo.numeroPasajeros = val;
                                    return { vehiculo };
                                })
                            }} />
                            <label htmlFor="numeroPasajeros">Numero pasajeros</label>
                        </span>
                    </div>
                    <div className="p-col-6">
                        <br />
                        <span className="p-float-label">
                            <InputText style={{ width: "100%" }} value={this.state.vehiculo.placa} id="placa" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let vehiculo = Object.assign({}, prevState.vehiculo);
                                    vehiculo.placa = val;
                                    return { vehiculo };
                                })
                            }} />
                            <label htmlFor="placa">Placa</label>
                        </span>
                    </div>
                    <div className="p-col-6">
                        <br />
                        <span>
                            <Dropdown style={{ width: "100%" }} value={this.state.tipoVehiculo} options={this.tipoVehiculoSelectItems} onChange={(e) => {
                                let val = e.target.value;
                                this.setState({ tipoVehiculo: val });
                                this.setState(prevState => {
                                    let infraccion = Object.assign({}, prevState.infraccion);
                                    infraccion.tipoVehiculo = val;
                                    return { infraccion };
                                })
                            }} placeholder="Tipo vehiculo" />
                        </span>
                        <br />
                    </div>
                    <div className="p-col-6">
                        <br />
                        <span className="p-float-label">
                            <InputText style={{ width: "100%" }} value={this.state.vehiculo.propiestario} id="plapropiestarioca" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let vehiculo = Object.assign({}, prevState.vehiculo);
                                    vehiculo.propiestario = val;
                                    return { vehiculo };
                                })
                            }} />
                            <label htmlFor="propiestario">Cedula propiestario</label>
                        </span>
                        <br />
                    </div>
                </div>
            </div>
        )
    }

    save() {
        alert("Guardar vehiculo")

        this.setState({
            vehiculo: {
                "id": null,
                "placa": null,
                "numeroChasis": null,
                "combustible": null,
                "cilindraje": null,
                "numeroPasajeros": null,
                "marca": null,
                "modelo": null,
                "tipoVehiculo": null,
                "propiestario": null
            }
        })
    }
}
export default CrearVehiculo