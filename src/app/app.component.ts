import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AutentificacionService } from './autentificacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private translate: TranslateService,
    private autentificacionService: AutentificacionService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //console.log('**********************SIEMPRE PASO PRIMERO ********************************');
      this.autentificacionService.ifLoggedIn();
      this.translate.addLangs(['es', 'pg']);
      this.translate.setDefaultLang('es'); // add this
      this.autentificacionService.islogin.subscribe(state => {
        //console.log('inicializado ' + this.autentificacionService.inicializado);
        if (this.autentificacionService.inicializado) {
          if (state) {
            //console.log('ESCUCHO EL CAMBIO DE ESTADO TRUE');
            this.router.navigate(['/dashboard/buscador']);
          } else {
            //console.log('ESCUCHO EL CAMBIO DE ESTADO FALSE');
            this.router.navigate(['/login']);
          }
        }

      });
    });
  }
}
