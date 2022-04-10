import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';
import { DbcacheService } from './dbcache.service';
import { ConnectionStatus, NetworkService } from './network.service';

@Injectable()
export class CacheInterceptorService implements HttpInterceptor {

  excluirarray: any = [
    { host: environment.Servidor + '/api/find-favorito', method: 'POST' },
    { host: environment.Servidor + '/api/find-like-slow-filtro', method: 'POST' },
    { host: environment.Servidor + '/api/find-like-innovation-ionic', method: 'POST' }
  ]
  operationExlude(url: string, method: string): boolean {
    var temporal = this.excluirarray.filter(obj => obj.host == url && obj.method == method).length;
    return temporal > 0 ? true : false;
  }

  constructor(
    private cacheService: CacheService,
    private dbcacheService: DbcacheService
    //, private networkService: NetworkService
  ) { }

 /* async procesarFavorito(req: any) {
    let newSalaries = [];
    let detornarfavorios = await this.dbcacheService.GetFavoritos(req.body.favorito_user_Id);
    //console.log('Paso contenido');
    //console.log('contenido ' + detornarfavorios);
   // return await detornarfavorios;
    return newSalaries;
  }*/

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('info interceptor ' + JSON.stringify(req));
    //console.log('incluir en cache ' + this.operationExlude(req.url, req.method));
    /*
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
          //console.log('MODO OFFLINE');
        } else {
          //console.log('MODO ONNLINE');
        }*/
    let offline = false;
    if (offline) {
      /*let final = [];      
      return of(null).pipe(mergeMap(() => {
        //console.log('Paso 0');
        if (req.url.includes("/api/find-favorito")) {
          //console.log('Paso 1 ');
          final = this.procesarFavorito(req);
          //console.log('Paso 2 '); 
        }
        //console.log('Paso 3');
        return of(new HttpResponse({ status: 200, body: final }));
      }));*/

    } else {


      if (req.method !== 'GET' && !this.operationExlude(req.url, req.method)) {
        //si no es una operacion Get no me molesto en catch
        //this.cacheService.invalidateCache();
        return next.handle(req);
      }

      if (this.cacheService.check(req.url, req.method, req.body)) {
        //console.log('logica si');
        // Busco en cache la solicitud 
        const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url, req.method, req.body);
        // si tengo cache en servicio para la solicitud  
        if (cachedResponse) {
          //si tengo cache respondo lo que tengo en cache
          //console.log(`Respondiendo desde cache: ${cachedResponse.url}`);
          //Devuelve un Observable que emite un valor concreto
          return of(cachedResponse);
        }

      }

      //console.log('logica flujo');


      // Flujo de llamada a otro interceptor o el servicio 
      return next.handle(req)
        .pipe(
          map(resp => {
            //Si llego aqui quiere decir que no tengo esto en cache por lo 
            //resguardo 
            if (resp instanceof HttpResponse) {
              //console.log(`agregando a  cache: ${req.url}`);
              this.cacheService.put(req.url, req.method, req.body, resp);
              return resp;
            }
          })
        );
    }
  }
}
