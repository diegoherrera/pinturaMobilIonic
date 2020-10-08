import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { BuscadorPage } from '../buscador/buscador.page';
import { NotificacionesPage } from '../notificaciones/notificaciones.page';
import { PalletsPage } from '../pallets/pallets.page';
import { PerfilPage } from '../perfil/perfil.page';
import { SustentabilidadPage } from '../sustentabilidad/sustentabilidad.page';
import { InnovacionPage } from '../innovacion/innovacion.page';
import { SlowPage } from '../slow/slow.page';
import { DownloadContentPage } from '../download-content/download-content.page';
import { SincronizarPage } from '../sincronizar/sincronizar.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: 'buscador',
        component: BuscadorPage
      },
      {
        path: 'notificaciones',
        component: NotificacionesPage
      },
      {
        path: 'palette',
        component: PalletsPage
      },
      {
        path: 'sustainability',
        component: SustentabilidadPage
      },
      {
        path: 'innovation',
        component: InnovacionPage
      },
      {
        path: 'slow',
        component: SlowPage
      },
      {
        path: 'Sincronizar',
        component: SincronizarPage
      },
      {
        path: 'perfil',
        component: PerfilPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/dashboard/buscador'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
