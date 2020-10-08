import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlowPage } from './slow.page';

const routes: Routes = [
  {
    path: '',
    component: SlowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlowPageRoutingModule {}
