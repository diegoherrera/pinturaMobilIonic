import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DetallePage } from '../detalle/detalle.page';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TranslateService } from '@ngx-translate/core';
import { AutentificacionService } from 'src/app/autentificacion.service';

@Component({
  selector: 'app-pallets',
  templateUrl: './pallets.page.html',
  styleUrls: ['./pallets.page.scss'],
})
export class PalletsPage implements OnInit, AfterViewInit {
  PalletsArray: any =[];
  language: any = 'pg';

  constructor(public modalController: ModalController
    , private usuarioService: UsuarioService
    , private auth: AutentificacionService
    , private translateService: TranslateService
    //, private storage: Storage 
    ) { 
  /*  this.storage.get('Language').then((val) => {
      //console.log('idioma tomando variable en PalletsPage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/

    
  }
  ngAfterViewInit(): void {
    this.getPallets();

    this.auth.getLanguage((retorno) => {
      console.log('idiona **************** ' + retorno);
      this.translateService.use(retorno);
      this.language = retorno;
    });

  }

  getPallets() {
    this.usuarioService.GetPallets().subscribe(data => {
      let arreglo: any = [];
      arreglo = data;
      //console.log(data);
      this.PalletsArray = arreglo.pallets;
    });
  }

  ngOnInit() {
    
  }

  async pushPage(objeto) {
    const modal = await this.modalController.create({
      component: DetallePage,
      cssClass: 'my-custom-class',
      componentProps: { 'data': objeto, 'language': this.language }
    });
    return await modal.present();
  }
}
