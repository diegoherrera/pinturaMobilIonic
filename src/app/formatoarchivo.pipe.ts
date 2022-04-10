import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoarchivo'
})
export class FormatoarchivoPipe implements PipeTransform {

  transform(value: any, arg): any {

    console.log('argumento ', arg);
    console.log('aparicion ', value.toLowerCase().indexOf(arg.toLowerCase()));
    console.log('entra', value);

    let nuevos = value.toLowerCase().indexOf('[-]');

    let data = value;
    let buscar = value.toLowerCase().indexOf(arg.toLowerCase());

    if (nuevos >= 0) {
      data = data.slice(value.toLowerCase().indexOf('[-]'), value.length);
      data = data.toLowerCase().replace('[-]', '').trim();
    } else {
      if (buscar === 0) {
        data = data.replace(arg, '').trim();
      } else {
        if (buscar > 0) {
          data = data.slice(value.toLowerCase().indexOf(arg.toLowerCase()), value.length);
          data = data.toLowerCase().replace(arg.toLowerCase(), '').trim();
        } else {
          //buscar = value.indexOf(' ');
          // data = data.slice(value.indexOf(' '), value.length);
        }

      }
    }





    if ("-".includes(data.trim()[0])) {
      data = data.slice(1, value.length);
    }
    if ("-".includes(data.trim()[0])) {
      data = data.slice(1, value.length);
    }


    console.log('sale', data);

    return data;
  }

}
