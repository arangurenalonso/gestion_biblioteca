import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ACTION } from 'src/app/enum/btn-actions';
import { Author } from 'src/app/model/author';
import { Book } from 'src/app/model/book';
import { Editorial } from 'src/app/model/editorial';
import { Loan } from 'src/app/model/loan';
import { LoanDetail } from 'src/app/model/loandetaily';
import { Refund } from 'src/app/model/refund';
import { RefundDetail } from 'src/app/model/refund-detail';
import { AuthorService } from 'src/app/services/authorService';
import { BookService } from 'src/app/services/BookService';
import { EditorialService } from 'src/app/services/editorialService';
import { LoanDetailService } from 'src/app/services/LoanDetailService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-step1',
  templateUrl: './devolucion-step1.component.html',
  styleUrls: ['./devolucion-step1.component.scss']
})
export class Step1DevolucionComponent implements OnInit {

  @Input() refund:Refund=new Refund(); 

  loanDetails: LoanDetail[] = [];


  public dniUsuario: string = '';
  buttonsTblLoanDetail=[
    {name:"Agregar",action:ACTION.add,class:"btn btn-sm btn-success"}
  ]
  buttonsTblRefundDetail=[
    {name:"Eliminar",action:ACTION.remove,class:"btn btn-sm btn-danger"}
  ]
  constructor(private loanDetailService: LoanDetailService,) { }

    async ngOnInit(): Promise<void> {
  }

  async findByUserDNI() {
    console.log(this.dniUsuario);
    
    let result=await this.loanDetailService.findByUserDNI(this.dniUsuario)
    
    this.loanDetails=result.detalle.data as LoanDetail[]
    
    console.log(result);
  }

  borrarUsuario(){
    this.loanDetails=[]
    this.refund.refundDetails=[]
  }
 
 
  onClickButtonTblBook(evt:any){    
    switch(evt.btnAction) {
      case ACTION.add:
        this.agregar(evt.obj)
        break;
      case ACTION.remove:
        this.eliminar(evt.obj)
        break;
      default:
        console.log(evt);
    }
    
  }

  agregar(loanDetail: LoanDetail) {
    let hasSelected = false
    
    this.refund.refundDetails.forEach(x => {
      if (x.loanDetail.id == loanDetail.id) {
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
    this.loanDetails=this.loanDetails.filter(x=>x.id != loanDetail.id)
    if (hasSelected) return
    let refundDetail = new RefundDetail()
    refundDetail.loanDetail = loanDetail
    refundDetail.refundQuantity = 1

    this.refund.refundDetails.push(refundDetail)
  }
  
  eliminar(refundDetail: RefundDetail) {
    this.refund.refundDetails = this.refund.refundDetails.filter(x => x.loanDetail.id != refundDetail.loanDetail.id)
    this.loanDetails.push(refundDetail.loanDetail)
  }

}
