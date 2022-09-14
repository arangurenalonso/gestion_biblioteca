import { Permissions } from "./permissions";
import { Person } from "./person";
import { Role } from "./roles";
export class Usuario {
  id: number;
  email: string;
  password: string;  
  person: Person=new Person();
  roles: Role[] = [];
}

