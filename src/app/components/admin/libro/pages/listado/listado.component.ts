import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/services/BookService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
 
  libros: Book[];  
 

  public paginator
  public pagSizeOption=[2,3,4,5]
  public pageNumber=0;
  public pageSize=4;
  public filtro:string='';
  public filtroBy:string="name"

  

  
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listar()

  }
  listar() {
    let filtroURL=`/page?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&filtro=${this.filtro}&filtroBy=${this.filtroBy}&sortDir=asc` 
    this.bookService.page(filtroURL)
    .subscribe(response => {
      console.log(response)
      this.paginator = response.detalle.data;
      this.libros  = response.detalle.data.contenido as Book[];
    });

  }
  
  handlePage(e:PageEvent){
    this.pageSize=e.pageSize
    this.pageNumber=e.pageIndex
    this.listar()
  }


  public delete(libro: Book): void {
    let tipoObjeto:String="Libro"
    Swal.fire({
      title: `Está seguro que desea eliminar la ${tipoObjeto} '${libro.name}'`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.delete(libro).subscribe(
          (response) => {
            Swal.fire(response.detalle.mensaje, '', 'success')
            this.listar()
          }
        )
      } else if (result.isDenied) {

      }
    })
  }

}
 