import axios from 'axios';

export class InfraccionService {
    baseUrl = "http://localhost:8080/infraccion/";
    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    getConsultaByDateRange(consulta) {
        return axios.get(this.baseUrl + "findByDateRange/"+consulta).then(res => res.data);
    }

    getConsultaByConductor(cedula) {
        return axios.get(this.baseUrl + "findCC/"+cedula).then(res => res.data);
    }

    save(infraccion){
        return axios.post(this.baseUrl+"save/", infraccion).then(res=>res.data);
    }


    
}
