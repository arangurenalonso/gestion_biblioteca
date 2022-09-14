import { Person } from "./person";
import { Propietario } from "./propietario";

export class Mascota {
    id:Number
    tipoMascota:String;
    nombre:String;
    raza:String;
    createAt:Date;
    isActive:Boolean
    propietario:Propietario
    personaRegistro:Person
  }
  