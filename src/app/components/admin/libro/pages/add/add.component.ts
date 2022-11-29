import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/model/author';
import { Book } from 'src/app/model/book';
import { Editorial } from 'src/app/model/editorial';
import { AuthorService } from 'src/app/services/authorService';
import { EditorialService } from 'src/app/services/editorialService';
import { BookService } from 'src/app/services/BookService';
import Swal from 'sweetalert2';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  entityName: String = "Libro"
  titulo: String = "Registrar"
  libro: Book = new Book()
  actualYear = new Date().getFullYear()
  editoriales: Editorial[] = [];
  authores: Author[] = [];

  src=null
  
  public fotoSeleccionada: File;
  public errores: any
  constructor(
    private authorService: AuthorService,
    private editorialService: EditorialService,
    private filseService:FileService,
    private bookService: BookService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    let authores=await this.authorService.all()
    this.authores = authores.detalle.data

    let editoriales=await this.editorialService.all()
    this.editoriales = editoriales.detalle.data

    await this.cargarInformación();
    // this.libro.urlImg="https://dawi1.s3.sa-east-1.amazonaws.com/1669092880259_fromApp.jpg"
    console.log(this.libro.urlImg);
    
  }



  async cargarInformación(): Promise<void> {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      let obj = await this.bookService.findById(id)
      this.libro = obj.detalle.data
      this.titulo = `Editar ${this.entityName}`
      
      
    this.editoriales = this.editoriales.filter(x => this.filtrado(x, this.libro.editorials));
    this.authores = this.authores.filter(x => this.filtrado(x, this.libro.authors));

    }
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
  async create() {
    if (this.fotoSeleccionada) {
      let respuesta=await this.filseService.subirFoto(this.fotoSeleccionada)
      console.log("respuesta",respuesta.detalle.data);
      this.libro.urlImg=respuesta.detalle.data
      
    } 
    
    this.bookService.registrar(this.libro)
      .subscribe(response => {
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
  async update() {
    console.log("this.fotoSeleccionada",this.fotoSeleccionada);
    
    if (this.fotoSeleccionada) {
      let respuesta=await this.filseService.subirFoto(this.fotoSeleccionada)
      console.log("respuesta",respuesta.detalle.data);
      this.libro.urlImg=respuesta.detalle.data
      
    } 

    this.bookService.actualizar(this.libro)
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
  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }else{
      const reader = new FileReader()

      reader.addEventListener('load', () => this.src = reader.result!!)
      reader.readAsDataURL(this.fotoSeleccionada)
    }
  }

}
