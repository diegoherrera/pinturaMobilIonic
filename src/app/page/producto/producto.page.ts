import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AutentificacionService } from 'src/app/autentificacion.service';
import { NetworkService } from 'src/app/network.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  @Input() data: any;
  @Input() language: any;
  procesando = false;

  constructor(private modalController: ModalController
    , private translateService: TranslateService
    , private usuarioService: UsuarioService
    , private auth: AutentificacionService
    , private networkService: NetworkService
    //, private storage: Storage
  ) {
    this.procesando = false;
    /*this.storage.get('Language').then((val) => {
      console.log('idioma tomando variable en ProductoPage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/



  }

  isHasConnection() {
    return false;
    // return this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ? false: true;
  }


  ngOnInit() {
    console.log(this.data);

    this.auth.getLanguage((retorno) => {
      console.log('idiona **************** ' + retorno);
      this.translateService.use(retorno);
      this.language = retorno;
    });
    if (this.isHasConnection()) {
      this.auth.getProfile((retorno) => {
        console.log('usuario actual login' + JSON.parse(retorno)._id);
        this.usuarioService.addFavorito(JSON.parse(retorno)._id, this.data._id).subscribe(data => {
          this.procesando = true;
        });
      });
    }   else {
      console.log('condicion modo offline');
    }

  }

  updateUrl($event, sectioinArray) {
    console.log('xxxxxxxxxxx $event.target.src ' + $event.target.src);
    sectioinArray.product_image = '';
    /*if ($event.target.src != '') {
      console.log('llego por aquiiiiiiiiiiiiiii');
      //console.log(JSON.stringify())
      $event.target.src = '';
    }*/
  }


  pushPage(id) {
    if (this.isHasConnection()) {
      this.auth.getProfile((retorno) => {
        console.log('usuario actual login' + JSON.parse(retorno)._id);
        this.usuarioService.sendCotizacion(JSON.parse(retorno)._id, id).subscribe(data => {
          this.procesando = true;
        });
      });
    } else {
      console.log('condicion modo offline');
    }    
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalController.dismiss(data);
  }
}
