import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { from, Observable, of } from 'rxjs';
import { AutentificacionService } from './autentificacion.service';

@Pipe({
  name: 'rutaarchivo'
})
export class RutaarchivoPipe implements PipeTransform {

  constructor(
    private http: HttpClient
    , private auth: AutentificacionService) { }

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

  transform(value: any): any {
   // console.log('que lleva el ' + value);
    return new Observable(observer => {
      //

      if (value != undefined) {
        let retorno: string = '';
        //console.log(value);
        if (value.includes('/public/')) {
          retorno = environment.Servidor + value;
        } else {
          retorno = environment.Servidor + '/public/' + value;
        }
        console.log('que lleva el ' + retorno);
        this.auth.isHasImageCache(retorno, (respuesta) => {
          //console.log('tiene cache la imagen ? ' + retorno + ' ' + respuesta);
          if (!respuesta) {
            console.log('no tiene cache');
            //primero resguardar 
            this.convertImageToBase64(retorno)
              .then(imagenbase64 => {
                // console.log(' genero cache ' + imagenbase64);
                this.auth.SetImageCache(retorno, imagenbase64, (respuesta) => {
                  //console.log('resguarde en cache ' + retorno + ' esta fue la respuesta ' + respuesta);
                  this.auth.SetHasImageCach(retorno, (operacion) => {
                   // console.log(' Marco flag de que tiene cache para  ' + retorno);
                    observer.next(imagenbase64);
                    observer.complete();
                  });
                });
              }).catch(error => {
                console.log(' genero error ' + retorno);
              });
          } else {
            
            this.auth.GetImageCache(retorno, (base64) => {
              console.log('si tiene cache ' + retorno);
              //console.log('contenido 64 para ' + retorno + ' ' + base64);
              observer.next(base64);
              observer.complete();
            })
          }
        })


        //observer.next(retorno);
        //observer.complete();
      }



    });
  }


  transform3o(value: any): any {
    if (value != undefined) {
      let retorno: string = '';
      console.log(value);
      if (value.includes('/public/')) {
        retorno = environment.Servidor + value;
      } else {
        retorno = environment.Servidor + '/public/' + value;
      }

      this.auth.isHasImageCache(retorno, (respuesta) => {
        console.log('tiene cache la imagen ? ' + retorno + ' ' + respuesta);
        if (!respuesta) {
          console.log('no tiene cache');
          this.convertImageToBase64(retorno)
            .then(imagenbase64 => {
              console.log(' genero cache ' + imagenbase64);
              this.auth.SetImageCache(retorno, imagenbase64, (respuesta) => {
                console.log('resguarde en cache ' + retorno + ' esta fue la respuesta ' + respuesta);
                this.auth.SetHasImageCach(retorno, (operacion) => {
                  console.log(' Marco flag de que tiene cache para  ' + retorno);
                });
              });
            }).catch(error => {
              console.log(' genero error ' + retorno);
            });
        } else {
          console.log('si tiene cache');
          this.auth.GetImageCache(retorno, (base64) => {
            console.log('contenido 64 para ' + retorno + ' ' + base64);
          })
        }
      })
      console.log('llego  validar ' + retorno);
      if (this.validarUrl(retorno)) {
        console.log('valido imagen');
        return retorno;
      } else {
        return 'imagen por defecto';
      }
    }


  }

  private async convertImageToBase64(url): Promise<any> {
    const response = await fetch(url);
    const blob = await response.blob();
    const result = new Promise((resolve, reject) => {
      if (blob.type === 'text/html') {
        resolve('');
      } else {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject;
        reader.readAsDataURL(blob);
      }
    });
    return await result;
  }


}
