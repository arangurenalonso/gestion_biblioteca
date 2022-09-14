import { Author } from "./author";
import { Editorial } from "./editorial";

export class Book {
    id: number;
    name: string;
    isbn:string;
    
    publicationYear:number;
    stock:number;
    borrowedStock:number;
    availableStock:number;

    editorials:Editorial[]=[];
    authors: Author[]=[];


  }