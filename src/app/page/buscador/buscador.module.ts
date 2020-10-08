import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscadorPageRoutingModule } from './buscador-routing.module';

import { BuscadorPage } from './buscador.page';
import { RutaarchivoPipe } from 'src/app/rutaarchivo.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscadorPageRoutingModule
  ],
  declarations: [BuscadorPage, RutaarchivoPipe]
})
export class BuscadorPageModule {}
