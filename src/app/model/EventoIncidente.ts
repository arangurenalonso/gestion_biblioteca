import { Departamento } from "./departamento";
import { HistorialIncidentes } from "./HistorialIncidentes";
import { Incidente } from "./Incidente";

export class EventoIncidente {
    id:number;
    departamento:Departamento;
    incidente:Incidente;    
    estado:number;
    historialIncidentes:HistorialIncidentes[]
    comentario:string

  }
	
	 


	