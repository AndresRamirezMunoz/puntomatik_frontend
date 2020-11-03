import axios from 'axios';

export class ConductorService {
    baseUrl = "http://localhost:8080/conductor/";
    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    findByCedula(cedula) {
        return axios.get(this.baseUrl + "find/" + cedula).then(res => res.data);
    }

    findByCedulaOne(cedula) {
        return axios.get(this.baseUrl + "findOne/" + cedula).then(res => res.data);
    }

    save(conductor) {
        return axios.post(this.baseUrl + "save/", conductor).then(res => res.data);
    }
}
