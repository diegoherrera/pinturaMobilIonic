import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentificacionService } from './autentificacion.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadGuardService implements CanActivate, CanActivateChild {

  constructor(public autentificacionService: AutentificacionService, private router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    //console.log('********************************************************************************');
    //console.log('ccanActivateChild ' + this.autentificacionService.isLoginControl());

    if (this.autentificacionService.isLoginControl()) return true;
    else {
      this.router.navigate(['/login']);
      //return false;
    }
  }

  canActivate(): boolean {
    //console.log('********************************************************************************');
    //console.log('canActivate ' + this.autentificacionService.isLoginControl());
    //return true;
    if (this.autentificacionService.isLoginControl()) return true;
    else {
      this.router.navigate(['/login']);
      //return false;
    }    
  }
}
