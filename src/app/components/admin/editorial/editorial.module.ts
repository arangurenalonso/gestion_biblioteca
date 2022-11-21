import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormComponent } from './pages/form/form.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { EditorialRoutingModule } from './editorial-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    FormComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    EditorialRoutingModule,
    MatPaginatorModule,
    SharedModule,
    FormsModule,
  ]
})
export class EditorialModule { }
