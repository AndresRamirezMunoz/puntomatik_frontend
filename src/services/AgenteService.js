import axios from 'axios';

export class AgenteService {
    baseUrl = "http://localhost:8080/agente/";
    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    findByCedula(cedula) {
        return axios.get(this.baseUrl + "find/" + cedula).then(res => res.data);
    }



}
