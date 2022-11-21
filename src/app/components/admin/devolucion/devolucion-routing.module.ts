import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { DevolucionComponent } from './pages/devolucion/devolucion.component';
import { ViewComponent } from './pages/view/view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'crear', component: DevolucionComponent },
      {path:'view/:id', component:ViewComponent},      
      { path: 'listado', component: ListadoComponent },
      { path: '**', redirectTo: 'crear' }
    ]
  }
]; 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevolucionRoutingModule { }
 