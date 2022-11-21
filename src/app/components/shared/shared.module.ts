import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBookComponent } from './table-book/table-book.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {MatPaginatorModule} from '@angular/material/paginator';
import { TableDevolucionComponent } from './table-refund/table-devolucion.component';
import { TableLoanDetailComponent } from './table-loan-detail/table-loan-detail.component';
import { FindUserComponent } from './find-user/find-user.component';
import { ModalBuscarVisitanteComponent } from './find-user/modal-buscar-user/modal-buscar-usuario.component';
import { TableRefundDetailComponent } from './table-refund-detail/table-refund-detail.component';

@NgModule({
  declarations: [
    TableBookComponent,
    PaginatorComponent,
    TableDevolucionComponent,
    TableLoanDetailComponent,
    FindUserComponent,
    TableRefundDetailComponent,
    ModalBuscarVisitanteComponent
  ],
  imports: [
    MatPaginatorModule,

    CommonModule,    
    FormsModule,
    RouterModule
  ],
  exports:[
    MatPaginatorModule,
    TableLoanDetailComponent,
    TableBookComponent,
    PaginatorComponent,
    TableDevolucionComponent,
    FindUserComponent,
    ModalBuscarVisitanteComponent,
    TableRefundDetailComponent
  ]
})
export class SharedModule { }
