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
