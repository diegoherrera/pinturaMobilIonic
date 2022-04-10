import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BuscadorPage } from './page/buscador/buscador.page';
import { DashboardPage } from './page/dashboard/dashboard.page';
import { DownloadContentPage } from './page/download-content/download-content.page';
import { InnovacionPage } from './page/innovacion/innovacion.page';
import { LoginPage } from './page/login/login.page';
import { PalletsPage } from './page/pallets/pallets.page';
import { PerfilPage } from './page/perfil/perfil.page';
import { PreferenciasPage } from './page/preferencias/preferencias.page';
import { SlowPage } from './page/slow/slow.page';
import { SustentabilidadPage } from './page/sustentabilidad/sustentabilidad.page';
import { VerificarPage } from './page/verificar/verificar.page';
import { SeguridadGuardService } from './seguridad-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/buscador',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    canActivate: [SeguridadGuardService],
    canActivateChild: [SeguridadGuardService],
    children: [
      { path: 'buscador', component: BuscadorPage },
      { path: 'perfil', component: PerfilPage },
      { path: 'palette', component: PalletsPage },
      { path: 'sustainability', component: SustentabilidadPage },
      { path: 'innovation', component: InnovacionPage },
      { path: 'slow', component: SlowPage },
      { path: 'offline', component: DownloadContentPage },
      { path: 'preferencia', component: PreferenciasPage },
    ]
  },
  {
    path: 'verificar',
    component: VerificarPage
  }
];


/*

,
  {
    path: 'filtrosustentable',
    loadChildren: () => import('./filtrosustentable/filtrosustentable.module').then( m => m.FiltrosustentablePageModule)
  }
  
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
];*/

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
