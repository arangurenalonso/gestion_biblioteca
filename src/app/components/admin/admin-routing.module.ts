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
        path: 'prestamo',
        loadChildren: () => import('./prestamo/prestamo.module').then(m=>m.PrestamoModule)
      },
      {
        path: 'servicio',
        loadChildren: () => import('./servicio/servicio.module').then(m=>m.ServicioModule)
      },
      {
        path: 'editorial',
        loadChildren: () => import('./editorial/editorial.module').then(m=>m.EditorialModule)
      },
      {
        path: 'pagos',
        loadChildren: () => import('./pagos/pagos.module').then(m=>m.PagosModule)
      },
      {
        path: 'eventos',
        loadChildren: () => import('./evento/evento.module').then(m=>m.EventoModule)
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
