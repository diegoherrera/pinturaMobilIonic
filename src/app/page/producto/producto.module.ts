import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';

import { ProductoPage } from './producto.page';
import { RutaarchivoPipe } from 'src/app/rutaarchivo.pipe';
import { FormatCheckPipe } from 'src/app/format-check.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoPageRoutingModule
  ],
  declarations: [ProductoPage, RutaarchivoPipe, FormatCheckPipe]
})
export class ProductoPageModule {}
