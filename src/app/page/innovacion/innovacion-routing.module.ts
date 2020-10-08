import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InnovacionPage } from './innovacion.page';

const routes: Routes = [
  {
    path: '',
    component: InnovacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InnovacionPageRoutingModule {}
