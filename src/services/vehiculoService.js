import axios from 'axios';

export class VehiculoService {
    baseUrl = "http://localhost:8080/vehiculo/";
    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }
}