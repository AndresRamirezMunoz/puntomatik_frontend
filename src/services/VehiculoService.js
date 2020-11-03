import axios from 'axios';

export class VehiculoService {
    baseUrl = "http://localhost:8080/vehiculo/";
    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    save(vehiculo){
        return axios.post(this.baseUrl+"save/", vehiculo).then(res=>res.data);
    }
    
    getConsultaByConductor(idVehiculo) {
        return axios.get(this.baseUrl + "findCC/"+idVehiculo).then(res => res.data);
    }

    getConsultaByID(idVehiculo) {
        return axios.get(this.baseUrl + "find/"+idVehiculo).then(res => res.data);
    }
}
