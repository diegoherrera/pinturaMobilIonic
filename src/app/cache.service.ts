import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private requests: any;

  constructor() {
    //console.log('Paso por el contructor');
    this.requests = [];
  }

  put(url: string, method: string, body: string, response: HttpResponse<any>): void {
    let expirationMins = 200;
    const expirationMS =  expirationMins * 60 * 1000 ;

    this.requests.push({ 
      response: response, 
      url: url, 
      method: method, 
      expiration: new Date().getTime() + expirationMS ,
      body: JSON.stringify(body) });
    //console.log('checked ACTUAL ' + this.requests.length);
  }

  check(url: string, method: string, body: string): boolean {
    const now = new Date().getTime();
    var temporal = this.requests.filter(obj => obj.expiration >= now && obj.url == url && obj.body == JSON.stringify(body));
    //console.log('checked check ' + temporal.length);
    //console.log(' registro ' + JSON.stringify(this.requests));

    return temporal.length > 0 ? true : false;
  }

  get(url: string, method: string, body: string): HttpResponse<any> | undefined {
    var temporal = this.requests.filter(obj => obj.url == url && obj.body == JSON.stringify(body));
    //console.log('checked check ' + temporal.length);
    return temporal[0].response;
  }

  invalidateCache(): void {
    this.requests = {};
  }

}
