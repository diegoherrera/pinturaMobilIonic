import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InnovationdetallePage } from './innovationdetalle.page';

const routes: Routes = [
  {
    path: '',
    component: InnovationdetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InnovationdetallePageRoutingModule {}
