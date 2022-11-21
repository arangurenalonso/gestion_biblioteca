import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevolucionRoutingModule } from './devolucion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DetalleDevolucionComponent } from './comun/detalle-devolucion/detalle-devolucion.component';
import { ViewComponent } from './pages/view/view.component';
import { SharedModule } from '../../shared/shared.module';
import { DevolucionComponent } from './pages/devolucion/devolucion.component';
import { Step1DevolucionComponent } from './comun/devolucion-step1/devolucion-step1.component';
import { Step2DevolucionComponent } from './comun/devolucion-step2/devolucion-step2.component';

@NgModule({
  declarations: [
    ListadoComponent,
    DevolucionComponent,
    DetalleDevolucionComponent,
    ViewComponent,
    Step1DevolucionComponent,
    Step2DevolucionComponent

  ],
  imports: [
    
    CommonModule,    
    FormsModule,
    DevolucionRoutingModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
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
  ]
})
export class DevolucionModule { }
