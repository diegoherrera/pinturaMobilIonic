import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Injectable()
export class AutentificacionService {
  inicializado: boolean = false;
  islogin = new BehaviorSubject(false);
  authState = new BehaviorSubject(false);
  profile = new BehaviorSubject<string>('');
  language = new BehaviorSubject<string>('es');

  constructor(private storage: Storage, private platform: Platform) {


    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });


  }

  registrarLanguage(language: any) {
    this.storage.set('Language', language).then((response) => {
      this.language.next(response);
    });
  }

  registrarisLogin() {
    console.log('is registrarLogin ');
    this.storage.set('isLogin', 'true').then((response) => {
      console.log('is login ' + response);
      this.islogin.next(true);
    });
  }

  registrarLogin(profile: any) {
    this.storage.set('profile', JSON.stringify(profile)).then((response) => {
      console.log('is profile ' + response);
      this.profile.next(JSON.stringify(profile));
    });
  }

  ifLoggedIn() {
    console.log('PASO POR EL METODO DE IFLOGIN');

    this.storage.get('isLogin').then((response) => {
      console.log('valor de is login ' + response);
      if (response) {
        console.log('paso por condicion ');
        this.islogin.next(true);
        this.inicializado = true;
      } else {
        this.islogin.next(false);
        this.inicializado = true;
      }
    });
  }

  isLoginControl() {
    return this.islogin.value;
  }

  logout() {
    this.storage.remove('isLogin').then(() => {
      this.islogin.next(false);
      this.storage.remove('profile').then(() => {
        this.profile.next('');
      });
    });
  }

  isHasImageCache(url, callback) {
    this.storage.get('img-cache-' + url).then((response) => {
      if (response) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  SetHasImageCach(url, callback) {
    this.storage.get('img-cache-' + url).then((response) => {
      callback(response);
    });
  }

  GetImageCache(url, callback) {
    this.storage.get('img-cache-content' + url).then((response) => {
      callback(response);
    });
  }

  /************************************************************/
  SetFavoritCache(contenido, callback) {
    this.storage.set('favorito-cache', contenido).then((response) => {
      callback(true);
    });
  }

  GetFavoritCache(callback) {
    this.storage.get('favorito-cache').then((response) => {
      callback(response);
    });
  }

  SetSustentabilidadCache(contenido, callback) {
    this.storage.set('Sustentabilidad-cache', contenido).then((response) => {
      callback(true);
    });
  }

  GetSustentabilidadCache(callback) {
    this.storage.get('Sustentabilidad-cache').then((response) => {
      callback(response);
    });
  }

  SetSlowCache(contenido, callback) {
    this.storage.set('Slow-cache', contenido).then((response) => {
      callback(true);
    });
  }

  GetSlowCache(callback) {
    this.storage.get('Slow-cache').then((response) => {
      callback(response);
    });
  }


  SetProductCache(contenido, callback) {
    this.storage.set('Product-cache', contenido).then((response) => {
      callback(true);
    });
  }

  GetProductCache(callback) {
    this.storage.get('Product-cache').then((response) => {
      callback(response);
    });
  }

  SetInnovableCache(contenido, callback) {
    this.storage.set('Innovable-cache', contenido).then((response) => {
      callback(true);
    });
  }

  GetInnovableCache(callback) {
    this.storage.get('Innovable-cache').then((response) => {
      callback(response);
    });
  }

  SetUserCache(contenido, callback) {
    this.storage.set('User-cache', contenido).then((response) => {
      callback(true);
    });
  }

  GetUserCache(callback) {
    this.storage.get('User-cache').then((response) => {
      callback(response);
    });
  }


  /************************************************************/

  SetImageCache(url, content, callback) {
    this.storage.set('img-cache-' + url, url).then((response) => {
      this.storage.set('img-cache-content' + url, content).then((response) => {
        callback(true);
      });
    });
  }

  SetTimeCache(time, callback) {
    this.storage.set('time-cache', time).then((response) => {
      callback(time);
    });
  }
  GetTimeCache(callback) {
    this.storage.get('time-cache').then((response) => {
      callback(response);
    });
  }


  SetRespaldoCache(tabla, contenido, callback) {
    this.storage.set(tabla, contenido).then((response) => {
      callback(true);
    });
  }

  GetRespaldoCache(tabla, callback) {
    this.storage.get(tabla).then((response) => {
      if (response) {
        callback(response);
      }
    });
  }

  isAuthenticated(callback) {
    this.storage.get('isLogin').then((response) => {
      if (response) {
        callback(true);
      }
    });
  }

  getProfile(callback) {
    this.storage.get('profile').then((response) => {
      if (response) {
        callback(response);
      }
    });
  }

  getLanguage(callback) {
    this.storage.get('Language').then((response) => {
      if (response) {
        callback(response);
      }
    });
  }

}
