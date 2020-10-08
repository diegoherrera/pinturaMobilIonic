import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InnovationdetallePageRoutingModule } from './innovationdetalle-routing.module';

import { InnovationdetallePage } from './innovationdetalle.page';
import { FormatCheckPipe } from 'src/app/format-check.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InnovationdetallePageRoutingModule
  ],
  declarations: [InnovationdetallePage, FormatCheckPipe]
})
export class InnovationdetallePageModule {}
