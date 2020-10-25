import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AutentificacionService } from 'src/app/autentificacion.service';
//import { TraductionService } from 'src/app/traduction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  activePath = '';
  pathprofile = '/dashboard/dashboard/perfil';
  pathnotification = '/dashboard/dashboard/notificaciones';
  profile: any = {
    user_mobile: ''
  };

  pages = [
    {
      name: 'Home',
      path: '/dashboard/buscador',
      image: 'home-outline'
    }, {
      name: 'My Profile',
      path: '/dashboard/perfil',
      image: 'person-outline'
    },
    {
      name: 'Pallete',
      path: '/dashboard/dashboard/palette',
      image: 'color-palette-outline'
    },
    {
      name: 'Sustentability',
      path: '/dashboard/dashboard/sustainability',
      image: 'archive-outline'
    },
    {
      name: 'Innovation',
      path: '/dashboard/dashboard/innovation',
      image: 'book-outline'
    },
    {
      name: 'Slow Movers',
      path: '/dashboard/dashboard/slow',
      image: 'duplicate-outline'
    }
  ]


  constructor(private router: Router, private translateService: TranslateService, private storage: Storage, public autentificacionService: AutentificacionService) {

   this.storage.get('Language').then((val) => {
      console.log('idioma tomando variable en BuscadorPage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });

    storage.get('profile').then((val) => {
      this.profile = JSON.parse(val);
    });

    console.log('paso por aqui  MenuPage');
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath = event.url
    })
  }
  logout() {
    console.log('evento logout');
    //this.router.navigate(['/login']);
    this.autentificacionService.logout();
  }
  ngOnInit() {
  }

}
