import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/model/author';
import { Departamento } from 'src/app/model/departamento';
import { Loan } from 'src/app/model/loan';
import { AuthorService } from 'src/app/services/authorService';
import { DepartamentoService } from 'src/app/services/departamentoservice';
import { LoanService } from 'src/app/services/LoanService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  
  loan: Loan[];  
 

  public paginator
  public pagSizeOption=[2,3,4,5]
  public pageNumber=0;
  public pageSize=4;
  public filtro:string='';
  public filtroBy:string="name"

  

  
  constructor(
    private loanService: LoanService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listar()

  }
  listar() {
    let filtroURL=`/page?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&filtro=${this.filtro}&filtroBy=${this.filtroBy}&sortDir=asc` 
    this.loanService.page(filtroURL)
    .subscribe(response => {
      console.log(response)
      this.paginator = response.detalle.data;
      this.loan  = response.detalle.data.contenido as Loan[];
    });

  }
  
  handlePage(e:PageEvent){
    this.pageSize=e.pageSize
    this.pageNumber=e.pageIndex
    this.listar()
  }


  public delete(loan: Loan): void {
    let tipoObjeto:String="Prestamo"
    Swal.fire({
      title: `Está seguro que desea eliminar el ${tipoObjeto} con id '${loan.id}'`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loanService.delete(loan).subscribe(
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
