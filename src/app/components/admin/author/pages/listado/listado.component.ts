import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/model/author';
import { AuthorService } from 'src/app/services/authorService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  
  authores: Author[];  
 

  public paginator
  public pagSizeOption=[2,3,4,5]
  public pageNumber=0;
  public pageSize=4;
  public filtro:string='';
  public filtroBy:string="name"

  

  
  constructor(
    private authorService: AuthorService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listar()

  }
  listar() {
    let filtroURL=`/page?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&filtro=${this.filtro}&filtroBy=${this.filtroBy}&sortDir=asc` 
    this.authorService.page(filtroURL)
    .subscribe(response => {
      console.log(response)
      this.paginator = response.detalle.data;
      this.authores  = response.detalle.data.contenido as Author[];
    });

  }
  
  handlePage(e:PageEvent){
    this.pageSize=e.pageSize
    this.pageNumber=e.pageIndex
    this.listar()
  }


  public delete(author: Author): void {
    let tipoObjeto:String="Author"
    Swal.fire({
      title: `Está seguro que desea eliminar la ${tipoObjeto} '${author.name}'`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorService.delete(author).subscribe(
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
