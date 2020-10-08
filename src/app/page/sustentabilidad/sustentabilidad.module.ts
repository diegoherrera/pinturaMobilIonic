import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SustentabilidadPageRoutingModule } from './sustentabilidad-routing.module';

import { SustentabilidadPage } from './sustentabilidad.page';
import { RutaarchivoPipe } from 'src/app/rutaarchivo.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SustentabilidadPageRoutingModule
  ],
  declarations: [SustentabilidadPage, RutaarchivoPipe]
})
export class SustentabilidadPageModule {}
