import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraductionService {

  traducciones: any = {};
  language: any = 'es';

  constructor(private storage: Storage) {
  }

  getLanguage() {
    this.storage.get('Language').then((val) => {
      this.language = val;
    });
  }
  
  setLanguageEs() {
    this.storage.set('Language', 'es');
    this.language = 'es';
  }
  setLanguagePg() {
    this.storage.set('Language', 'pg');
    this.language = 'pg';
  }
}
