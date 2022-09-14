import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/model/author';
import { Book } from 'src/app/model/book';
import { Departamento } from 'src/app/model/departamento';
import { Editorial } from 'src/app/model/editorial';
import { AuthorService } from 'src/app/services/authorService';
import { EditorialService } from 'src/app/services/editorialService';
import { BookService } from 'src/app/services/BookService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  entityName: String = "Libro"
  titulo: String = "Registrar "
  libro: Book = new Book()
  actualYear = new Date().getFullYear()
  editoriales: Editorial[] = [];
  authores: Author[] = [];

  public errores: any
  constructor(
    private authorService: AuthorService,
    private editorialService: EditorialService,
    private bookService: BookService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    let authores=await this.authorService.all()
    this.authores = authores.detalle.data

    let editoriales=await this.editorialService.all()
    this.editoriales = editoriales.detalle.data

    console.log("authores",this.authores);
    console.log("editoriales",this.editoriales);
    await this.cargarInformación();

  }



  async cargarInformación(): Promise<void> {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      let obj = await this.bookService.findById(id)
      this.libro = obj.detalle.data
      this.titulo = `Editar ${this.entityName}`
      console.log(this.authores);
      console.log(this.libro.authors);
      
      console.log(this.editoriales);
      console.log(this.libro.editorials);
      
      
      
      this.actualizarEditorial()
      this.actualizarAuthor()

    }
  }
  actualizarEditorial() {
    this.editoriales = this.editoriales.filter(x => this.filtrado(x, this.libro.editorials));
  }
  actualizarAuthor() {
    this.authores = this.authores.filter(x => this.filtrado(x, this.libro.authors));
  }

  filtrado(obj, list1): boolean {
    let isFilter = true
    list1.forEach(item => {
      if (item.id == obj.id) { 
        isFilter = false 
        return;
      }      
    })
    return isFilter;
  }






  addEditorial(editorial: Editorial) {
    this.libro.editorials.push(editorial)
    this.editoriales = this.editoriales.filter(x => x.id != editorial.id)
    this.editoriales.sort((x, y) => x.id - y.id)
  }
  dropEditorial(editorial: Editorial) {
    this.editoriales.push(editorial)
    this.libro.editorials = this.libro.editorials.filter(x => x.id != editorial.id)
    this.editoriales.sort((x, y) => x.id - y.id)
  }
  addAuthor(author: Author) {
    this.libro.authors.push(author)
    this.authores = this.authores.filter(x => x.id != author.id)
    this.authores.sort((x, y) => x.id - y.id)
  }
  dropAuthor(author: Author) {
    this.authores.push(author)
    this.libro.authors = this.libro.authors.filter(x => x.id != author.id)
    this.authores.sort((x, y) => x.id - y.id)
  }
  create() {
    console.log(this.libro);

    this.bookService.registrar(this.libro)
      .subscribe(response => {
        console.log(response.detalle.data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.detalle.data.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/libro/listado'])
      },
        err => {
          let respuesta = err.error
          this.errores = respuesta.detalle.data
        }
      )

  }

}
