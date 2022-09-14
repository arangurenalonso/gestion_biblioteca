import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitanteRoutingModule } from './prestamo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { ModalBuscarVisitanteComponent } from './pages/modal-buscar-visitante/modal-buscar-visitante.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListadoComponent } from './pages/listado/listado.component';

@NgModule({
  declarations: [
    ListadoComponent,
    PrestamoComponent,
    ModalBuscarVisitanteComponent,
  ],
  imports: [
    
    CommonModule,    
    FormsModule,
    VisitanteRoutingModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatMomentDateModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule
    //ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class PrestamoModule { }
