import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { ListadoComponent } from './pages/listado/listado.component';


const routes: Routes = [
  {
    path: '',
    children: [      
      { path:'registro', component:FormComponent},
      { path: 'listado', component: ListadoComponent },
      { path: '**', redirectTo: 'listado' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventoRoutingModule { }
 