import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/model/author';
import { Book } from 'src/app/model/book';
import { Editorial } from 'src/app/model/editorial';
import { Loan } from 'src/app/model/loan';
import { LoanDetail } from 'src/app/model/loandetaily';
import { Usuario } from 'src/app/model/usuarios';
import { AuthorService } from 'src/app/services/authorService';
import { BookService } from 'src/app/services/BookService';
import { EditorialService } from 'src/app/services/editorialService';
import { LoanService } from 'src/app/services/LoanService';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/userService';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-gestion-visita',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.html']
})
export class PrestamoComponent implements OnInit {
  loan: Loan = new Loan()

  public isHabilitado: boolean = true
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


  isEditable = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  agregarValidaciones() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  goForwardStep1(stepper: MatStepper) {
    stepper.next();
  }

  constructor(private bookService: BookService,
    private _formBuilder: FormBuilder,
    private authorService: AuthorService,
    private userService: UserService,
    private loanService: LoanService,
    public modalService: ModalService, 
    private router: Router,
    private editorialService: EditorialService,
    private activatedRoute: ActivatedRoute,) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.listAuthor(),
      this.listEditorial(),
      this.listar()
    ])

    this.escucharCierreModalVisitante()

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

  myFilter = (d: Date | null): boolean => {

    // Prevent Saturday and Sunday from being selected.
    return d >= new Date();
  };
  abrirModalCrearCliente() {
    this.modalService.abrirModalBuscarVisitante()
  }
  escucharCierreModalVisitante() {

    this.modalService.notificarCerrarModalBuscarVisitante.subscribe((usuario) => {
      if (usuario) {
        this.loan.client = usuario
        this.filtro = this.loan?.client?.person?.dni
      }
    })
  }
  buscarCliente() {
    if (this.filtro.length == 8) {
      let filtroURL = `/search?dni=${this.filtro}`
      this.userService.find(filtroURL)
        .subscribe(response => {
          this.loan.client = response.detalle.data as Usuario;
          console.log(this.loan.client)
        });
    }
  }


  borrarCliente() {
    this.loan.client = null
  }

  procesarPrestamo() {
    Swal.fire({
      title: `Está seguro que desea procesar el prestamo al Cliente ${this.loan.client.person.name} ${this.loan.client.person.surname}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.loanService.registrar(this.loan)
          .subscribe(response => {
            console.log(response)

            this.router.navigate(['/admin/prestamo/listado'])
          });
      }
    })
  }
}  
