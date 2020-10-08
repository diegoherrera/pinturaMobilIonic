import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SustentabilidadPage } from './sustentabilidad.page';

const routes: Routes = [
  {
    path: '',
    component: SustentabilidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SustentabilidadPageRoutingModule {}
