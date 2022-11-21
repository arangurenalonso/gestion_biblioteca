import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ACTION } from 'src/app/enum/btn-actions';
import { Author } from 'src/app/model/author';
import { Book } from 'src/app/model/book';
import { Editorial } from 'src/app/model/editorial';
import { Loan } from 'src/app/model/loan';
import { LoanDetail } from 'src/app/model/loandetaily';
import { AuthorService } from 'src/app/services/authorService';
import { BookService } from 'src/app/services/BookService';
import { EditorialService } from 'src/app/services/editorialService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-step1',
  templateUrl: './prestamo-step1.component.html',
  styleUrls: ['./prestamo-step1.component.scss']
})
export class Step1PrestamoComponent implements OnInit {

  @Input() loan:Loan=new Loan(); 

  books: Book[] = [];
  editoriales: Editorial[] = [];
  authores: Author[] = [];

  public paginator
  public pagSizeOption = [2, 3, 4, 5]
  public pageNumber = 0;
  public pageSize = 4;
  public sortDir: string = 'DESC';
  public sortBy: string = "name"

  public filtro: string = ''
  public nombreLibro: string = '';
  authorSeleccionado = 0
  editorialSeleccionada = 0
  buttonsTblBook=[
    {name:"Agregar",action:ACTION.add,class:"btn btn-sm btn-success"}
  ]
  buttonsTblLoanDetail=[
    {name:"Eliminar",action:ACTION.remove,class:"btn btn-sm btn-danger"}
  ]
  constructor(private bookService: BookService,
    private authorService: AuthorService,
    private editorialService: EditorialService,) { }

    async ngOnInit(): Promise<void> {
    
    await Promise.all([
      this.listAuthor(),
      this.listEditorial(),
      this.listar()
    ])
  }

  async listAuthor() {

    let authores=await this.authorService.all()
    this.authores = authores.detalle.data
    
  }
  async listEditorial() {

    let editoriales=await this.editorialService.all()
    this.editoriales = editoriales.detalle.data
    
  }
  listar() {
    let filtroURL = `/page?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&sortDir=${this.sortDir}&sortBy=${this.sortBy}&filtro=${this.filtro}&nombreLibro=${this.nombreLibro}&idAuthor=${this.authorSeleccionado}&idEditorial=${this.editorialSeleccionada}`
    console.log(filtroURL)
    this.bookService.page(filtroURL)
      .subscribe(response => {
        console.log(response)
        this.paginator = response.detalle.data;
        this.books = response.detalle.data.contenido as Book[];
      });
  }


  pageEvent(e: PageEvent) {
    this.pageSize = e.pageSize
    this.pageNumber = e.pageIndex
    this.listar()
  }
  buscarNombre() {
    this.pageNumber = 0
    this.authorSeleccionado = 0
    this.editorialSeleccionada = 0

    this.filtro = 'nombreLibro'
    this.listar()
  }
  selectAuthor() {

    this.pageNumber = 0
    this.editorialSeleccionada = 0
    this.nombreLibro = ''


    this.filtro = 'filtroAuthor'
    if (this.authorSeleccionado == 0) return

    this.listar()

  }
  selectEditorial() {

    this.pageNumber = 0
    this.authorSeleccionado = 0
    this.nombreLibro = ''

    this.filtro = 'filtroEditorial'
    if (this.editorialSeleccionada == 0) return

    this.listar()

  }
  onClickButtonTblBook(evt:any){    
    switch(evt.btnAction) {
      case ACTION.add:
        this.agregar(evt.book)
        break;
      case ACTION.remove:
        this.eliminar(evt.obj)
        break;
      default:
        console.log(evt);
    }
    
  }

  agregar(book: Book) {
    let hasSelected = false
    
    this.loan.loanDetails.forEach(x => {
      if (x.book.id == book.id) {
        Swal.fire({
          position: 'center',
          title: `Error `,
          icon: 'error',
          text: `Libro ya ha sido agregado al carrito `,
          showConfirmButton: false,
          timer: 2500
        })
        hasSelected = true
        return
      }
    });
    if (hasSelected) return
    let loanDetail = new LoanDetail()
    loanDetail.book = book
    loanDetail.loanQuantity = 1

    this.loan.loanDetails.push(loanDetail)
  }
  
  eliminar(loanDetail: LoanDetail) {
    this.loan.loanDetails = this.loan.loanDetails.filter(x => x.book.id != loanDetail.book.id)
  }

}
