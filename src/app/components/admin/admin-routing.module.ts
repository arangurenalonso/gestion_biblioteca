import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, 
    children: [
      {
        path: 'home',
        loadChildren: () => import('./main/main.module').then(m=>m.MainModule)
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m=>m.AuthorModule)
      },
      {
        path: 'libro',
        loadChildren: () => import('./libro/libro.module').then(m=>m.LibroModule)
      },
      {
        path: 'editorial',
        loadChildren: () => import('./editorial/editorial.module').then(m=>m.EditorialModule)
      },
      
      {
        path: 'prestamo',
        loadChildren: () => import('./prestamo/prestamo.module').then(m=>m.PrestamoModule)
      },
      
      {
        path: 'devolucion',
        loadChildren: () => import('./devolucion/devolucion.module').then(m=>m.DevolucionModule)
      },
      { path: '**', redirectTo: 'home' }
    ]
  },
]

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
