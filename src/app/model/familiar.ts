import { Person } from "./person";
import { Propietario } from "./propietario";

export class Familiar {
  id: number;
  parentesco: string;
  birthdayDate: Date;
  propietario: Propietario;
  person: Person;


}
