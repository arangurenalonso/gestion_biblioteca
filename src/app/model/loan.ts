
import { LoanDetail } from "./loandetaily";
import { Usuario } from "./usuarios";

export class Loan {
    id: number;
    employee: Usuario;
    client:Usuario;
    loanDate:Date;
    expirationDate:Date
    loanDetails:LoanDetail[]=[]
  }