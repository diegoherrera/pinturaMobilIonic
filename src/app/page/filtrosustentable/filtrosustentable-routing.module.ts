import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltrosustentablePage } from './filtrosustentable.page';

const routes: Routes = [
  {
    path: '',
    component: FiltrosustentablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltrosustentablePageRoutingModule {}
