import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'crear', component: PrestamoComponent },
      
      { path: 'listado', component: ListadoComponent },
      { path: '**', redirectTo: 'crear' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitanteRoutingModule { }
 