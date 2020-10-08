import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./page/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'verificar',
    loadChildren: () => import('./page/verificar/verificar.module').then( m => m.VerificarPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./page/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./page/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'buscador',
    loadChildren: () => import('./page/buscador/buscador.module').then( m => m.BuscadorPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./page/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'pallets',
    loadChildren: () => import('./page/pallets/pallets.module').then( m => m.PalletsPageModule)
  },
  {
    path: 'detalle',
    loadChildren: () => import('./page/detalle/detalle.module').then( m => m.DetallePageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./page/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'sustentabilidad',
    loadChildren: () => import('./page/sustentabilidad/sustentabilidad.module').then( m => m.SustentabilidadPageModule)
  },
  {
    path: 'innovacion',
    loadChildren: () => import('./page/innovacion/innovacion.module').then( m => m.InnovacionPageModule)
  },
  {
    path: 'slow',
    loadChildren: () => import('./page/slow/slow.module').then( m => m.SlowPageModule)
  },
  {
    path: 'download-content',
    loadChildren: () => import('./page/download-content/download-content.module').then( m => m.DownloadContentPageModule)
  },
  {
    path: 'sincronizar',
    loadChildren: () => import('./page/sincronizar/sincronizar.module').then( m => m.SincronizarPageModule)
  },
  {
    path: 'innovationdetalle',
    loadChildren: () => import('./page/innovationdetalle/innovationdetalle.module').then( m => m.InnovationdetallePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
