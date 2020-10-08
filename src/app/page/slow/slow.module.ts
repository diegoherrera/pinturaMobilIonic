import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlowPageRoutingModule } from './slow-routing.module';

import { SlowPage } from './slow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlowPageRoutingModule
  ],
  declarations: [SlowPage]
})
export class SlowPageModule {}
