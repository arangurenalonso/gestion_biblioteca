import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoComponent } from './pages/listado/listado.component';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './pages/add/add.component';


import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { LibroRoutingModule } from './libro-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OnlyNumber } from 'src/app/directiva/OnlyNumber';
@NgModule({
  declarations: [
    ListadoComponent,
    AddComponent,
    OnlyNumber
  ],
  imports: [
    CommonModule,    
    FormsModule,
    LibroRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  exports:[
  ],
  providers:[],
  
})
export class LibroModule { }
