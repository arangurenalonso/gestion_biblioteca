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
    urlImg:string="https://dawi1.s3.sa-east-1.amazonaws.com/1668547446170_descarga.jpg"

  }