import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traductor'
})
export class TraductorPipe implements PipeTransform {

  traducciones: any = [];
  constructor(private storage: Storage) {

  }
  transform(value: string): string { 
/*
    this.storage.get('traduction').then((val) => {
      this.traducciones = JSON.parse(val);
    });

    var desc = this.traducciones.find(function(e) {
      return e.key_name == value
    })  */  
  
    return value;
  }

}
