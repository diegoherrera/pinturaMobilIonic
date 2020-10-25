import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentificacionService } from './autentificacion.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadGuardService implements CanActivate {

  constructor(public autentificacionService: AutentificacionService) { }

  canActivate(): boolean {
    console.log('********************************************************************************');
    console.log('zzzzzzzzzzz ' + this.autentificacionService.isLoginControl());
    return true;    
  }
}
