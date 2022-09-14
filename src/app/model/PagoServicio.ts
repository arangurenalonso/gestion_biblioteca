import { Departamento } from "./departamento";
import { PagoServicioDetalle } from "./PagoServicioDetalle";
import { Person } from "./person";

export class PagoServicio {
    id:number;
    montoTotal:number;
    createAt:Date;    
    personaRegistro:Person;
    departamento:Departamento;
    pagoServicioDetalle:PagoServicioDetalle[]

  }
	
	
	