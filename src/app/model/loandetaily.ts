
import { Book } from "./book";

export class LoanDetail {
    id: number;
    book: Book;
    loanQuantity:number;
    refundQuantity:number;
    loanDetailLoanId: number;
  }