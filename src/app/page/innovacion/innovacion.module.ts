import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InnovacionPageRoutingModule } from './innovacion-routing.module';

import { InnovacionPage } from './innovacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InnovacionPageRoutingModule
  ],
  declarations: [InnovacionPage]
})
export class InnovacionPageModule {}
