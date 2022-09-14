import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Editorial } from 'src/app/model/editorial';
import { EditorialService } from 'src/app/services/editorialService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {


 
  editorial: Editorial[];  


  public paginator
  public pagSizeOption=[2,3,4,5]
  public pageNumber=0;
  public pageSize=4;
  public filtro:string='';
  public filtroBy:string="name"

  
  constructor(
    private editorialService: EditorialService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listar()

  }
  listar() {
    let filtroURL=`/page?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&filtro=${this.filtro}&filtroBy=${this.filtroBy}&sortDir=asc` 
    this.editorialService.page(filtroURL)
    .subscribe(response => {
      console.log(response)
      this.paginator = response.detalle.data;
      this.editorial  = response.detalle.data.contenido as Editorial[];
    });

  }
 
  handlePage(e:PageEvent){
    this.pageSize=e.pageSize
    this.pageNumber=e.pageIndex
    this.listar()
  }

  public delete(editorial: Editorial): void {
    let tipoObjeto:String="Editorial"
    Swal.fire({
      title: `Está seguro que desea eliminar la ${tipoObjeto} '${editorial.name}'`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.editorialService.delete(editorial).subscribe(
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
