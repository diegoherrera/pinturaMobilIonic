import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'rutaarchivopdf'
})
export class RutaarchivopdfPipe implements PipeTransform {

  transform(value: any): any {
    if (value != undefined) {
      let retorno: string = '';
      //console.log(value);
      if (value.includes('/public/')) {
        retorno = environment.Servidor + value;
      } else {
        retorno = environment.Servidor + '/public/' + value;
      }
      return retorno;
    }
  }
}
