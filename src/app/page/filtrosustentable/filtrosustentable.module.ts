import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltrosustentablePageRoutingModule } from './filtrosustentable-routing.module';

import { FiltrosustentablePage } from './filtrosustentable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltrosustentablePageRoutingModule
  ],
  declarations: [FiltrosustentablePage]
})
export class FiltrosustentablePageModule {}
