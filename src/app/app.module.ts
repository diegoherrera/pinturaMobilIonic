import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { TraductorPipe } from './traductor.pipe';
import { RutaarchivoPipe } from './rutaarchivo.pipe';
import { FormatCheckPipe } from './format-check.pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AutentificacionService } from './autentificacion.service';
import { LoginPage } from './page/login/login.page';
import { VerificarPage } from './page/verificar/verificar.page';
import { DashboardPage } from './page/dashboard/dashboard.page';
import { BuscadorPage } from './page/buscador/buscador.page';
import { ProductoPage } from './page/producto/producto.page';
import { SincronizarPage } from './page/sincronizar/sincronizar.page';
import { PerfilPage } from './page/perfil/perfil.page';
import { InnovacionPage } from './page/innovacion/innovacion.page';
import { PalletsPage } from './page/pallets/pallets.page';
import { SlowPage } from './page/slow/slow.page';
import { SustentabilidadPage } from './page/sustentabilidad/sustentabilidad.page';
import { DetallePage } from './page/detalle/detalle.page';
import { InnovationdetallePage } from './page/innovationdetalle/innovationdetalle.page';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent, 
    TraductorPipe, 
    RutaarchivoPipe, 
    FormatCheckPipe, 
    LoginPage,
    VerificarPage,
    DashboardPage,
    BuscadorPage,
    ProductoPage,
    SincronizarPage,
    PerfilPage,
    PalletsPage,
    SustentabilidadPage,
    InnovacionPage,
    SlowPage,
    DetallePage,
    InnovationdetallePage, 
    DetallePage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({ // <--- add this
      loader: { // <--- add this 
        provide: TranslateLoader, // <--- add this
        useFactory: (createTranslateLoader),  // <--- add this
        deps: [HttpClient] // <--- add this
      } // <--- add this
    }) // <--- add this
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    AutentificacionService,
    Camera,
    FileTransfer,
    SQLitePorter,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
