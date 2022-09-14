import { Departamento } from "./departamento"
import { Person } from "./person"
import { Propietario } from "./propietario"
import { Visitante } from "./visitante"


export class Visita {
  id: Number 
  fechaHoraLlegada: Date
  fechaHoraSalida: Date
  motivoVisita: string
  observacionSalida: string

  estado: number;
  createAt: Date;

  propietario: Propietario
  departamento: Departamento
  visitante: Visitante
  personaRegistro: Person

}
