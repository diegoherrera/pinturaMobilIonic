import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraductionService {

  traducciones: any = [];
  constructor(private storage: Storage) {

  }

  obtenerTraducciones(callback) {
    this.storage.get('traduction').then((val) => {
      this.traducciones = JSON.parse(val);
      callback(true);
    });
  }

  traduction(value: string): any {
    this.obtenerTraducciones((retorno) => {
      var desc = this.traducciones.find(function (e) {
        return e.key_name == value
      })
      return desc.traduction_name;
    })  
  }
}
