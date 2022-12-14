import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitanteRoutingModule } from './prestamo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
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
import { DetallePrestamoComponent } from './comun/detalle-prestamo/detalle-prestamo.component';
import { ViewComponent } from './pages/view/view.component';
import { SharedModule } from '../../shared/shared.module';
import { Step1PrestamoComponent } from './comun/prestamo-step1/prestamo-step1.component';
import { Step2PrestamoComponent } from './comun/prestamo-step2/prestamo-step2.component';

@NgModule({
  declarations: [
    ListadoComponent,
    PrestamoComponent,
    Step1PrestamoComponent,
    Step2PrestamoComponent,
    DetallePrestamoComponent,
    ViewComponent
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
    MatCheckboxModule,
    SharedModule
    //ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class PrestamoModule { }
