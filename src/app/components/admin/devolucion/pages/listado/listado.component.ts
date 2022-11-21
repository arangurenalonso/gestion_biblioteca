import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {  Router } from '@angular/router';
import { ACTION } from 'src/app/enum/btn-actions';
import { Refund } from 'src/app/model/refund';
import { RefundService } from 'src/app/services/refundService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  
  refunds: Refund[];  
 

  public paginator
  public pagSizeOption=[2,3,4,5]
  public pageNumber=0;
  public pageSize=4;
  public filtro:string='';
  public filtroBy:string="name"

  
  buttonsTblRefund=[
    {name:"View",action:ACTION.view,class:"btn btn-sm btn-primary"},
    {name:"Eliminar",action:ACTION.delete,class:"btn btn-sm btn-danger"}    
  ]

  
  constructor(
    private refundService: RefundService,
    private router: Router,) { }

  ngOnInit(): void {
    this.listar()

  }
  listar() {
    let filtroURL=`/page?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&filtro=${this.filtro}&filtroBy=${this.filtroBy}&sortDir=asc` 
    this.refundService.page(filtroURL)
    .subscribe(response => {
      console.log(response)
      this.paginator = response.detalle.data;
      this.refunds  = response.detalle.data.contenido as Refund[];
    });

  }
  
  handlePage(e:PageEvent){
    this.pageSize=e.pageSize
    this.pageNumber=e.pageIndex
    this.listar()
  }

  onClickButton(evt:any){    
    switch(evt.btnAction) {
      case ACTION.view:
        this.view(evt.obj)
        break;
      case ACTION.delete:
        this.delete(evt.obj)
        break;
      default:
        console.log(evt);
    }
    
  }
  public view(refund: Refund){
    this.router.navigate(['/admin/devolucion/view',refund.id])
  }
  public delete(refund: Refund): void {
    Swal.fire({
      title: `Está seguro que desea eliminar la devolución con id '${refund.id}'`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.refundService.delete(refund).subscribe(
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
