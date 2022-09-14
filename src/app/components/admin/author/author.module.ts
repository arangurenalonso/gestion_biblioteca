import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './pages/form/form.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { AuthorRoutingModule } from './author-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [ 
    ListadoComponent,
    FormComponent,
  ],
  imports: [ 
    
    MatPaginatorModule, 
    FormsModule,
    CommonModule,    
    FormsModule,
    AuthorRoutingModule,
    SharedModule
  ]
})
export class AuthorModule { }
