import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { from, of } from 'rxjs';

@Pipe({
  name: 'rutaarchivo'
})
export class RutaarchivoPipe implements PipeTransform {

  constructor(private http: HttpClient) { }

  validarUrl(value: string): any {
    return this.http
      .get(value)
      .pipe(
        map(data => {
          console.log('imagen true');
          return true;
        }),
        catchError(error => {
          return of(() => {
            console.log('imagen false');
            return false;
          })
        })
      )
  }

  transform(value: any): string {
    if (value != undefined) {
      let retorno: string = '';
      console.log(value);
      if (value.includes('/public/')) {
        retorno = environment.Servidor + value;
      } else {
        retorno = environment.Servidor + '/public/' + value;
      }
      console.log('llego  validar ' + retorno);
      if (this.validarUrl(retorno)) {
        console.log('valido imagen');
        return retorno;
      } else {
        return 'imagen por defecto';
      }
    }


  }

}
