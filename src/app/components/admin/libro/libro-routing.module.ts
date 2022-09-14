import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listado/page/:page', component: ListadoComponent },
      { path: 'listado', component: ListadoComponent },
      { path: 'crear', component: AddComponent },
      {path:'update/:id', component:AddComponent},
      { path: '**', redirectTo: 'listado' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibroRoutingModule { }
 