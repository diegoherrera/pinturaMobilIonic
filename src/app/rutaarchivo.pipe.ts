import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'rutaarchivo'
})
export class RutaarchivoPipe implements PipeTransform {

  transform(value: any): string {
    let retorno: string = '';

    if (value.includes('/public/')) {
      retorno = environment.Servidor + value;
    } else {
      retorno = environment.Servidor + '/public/' + value;
    }
    return retorno;
  }

}
