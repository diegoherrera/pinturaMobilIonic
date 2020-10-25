import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InnovationdetallePageRoutingModule } from './innovationdetalle-routing.module';

import { InnovationdetallePage } from './innovationdetalle.page';
import { FormatCheckPipe } from 'src/app/format-check.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InnovationdetallePageRoutingModule,
    TranslateModule.forRoot({ // <--- add this
      loader: { // <--- add this 
        provide: TranslateLoader, // <--- add this
        useFactory: (createTranslateLoader),  // <--- add this
        deps: [HttpClient] // <--- add this
      } // <--- add this
    }) // <--- add this
  ],
  declarations: [InnovationdetallePage, FormatCheckPipe]
})
export class InnovationdetallePageModule {}
