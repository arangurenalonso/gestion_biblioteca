import { PropietarioDepartamento } from "./propietarioDepartamento";
import { Familiar } from "./familiar";
import { Mascota } from "./Mascota";
import { Person } from "./person";

export class Propietario {
  id: number;
  birthdayDate: Date;

  mascotas:Mascota[]=[];
  familiares:Familiar[]=[];
  numeroCelular:String;
  persona:Person
  propietarioDepartamentos:PropietarioDepartamento[]=[]

  }  