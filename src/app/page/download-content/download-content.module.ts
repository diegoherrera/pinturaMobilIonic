import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { DownloadContentPageRoutingModule } from './download-content-routing.module';

import { DownloadContentPage } from './download-content.page';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule,
    DownloadContentPageRoutingModule
  ],
  declarations: [DownloadContentPage]
})
export class DownloadContentPageModule {}
