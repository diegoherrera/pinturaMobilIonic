import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AutentificacionService } from 'src/app/autentificacion.service';
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
    //, private storage: Storage
  ) {
    this.procesando = false;
    /*this.storage.get('Language').then((val) => {
      console.log('idioma tomando variable en ProductoPage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/



  }

  ngOnInit() {
    console.log(this.data);

    this.auth.getLanguage((retorno) => {
      console.log('idiona **************** ' + retorno);
      this.translateService.use(retorno);
      this.language = retorno;
    });

    this.auth.getProfile((retorno) => {
      console.log('usuario actual login' + JSON.parse(retorno)._id);
      this.usuarioService.addFavorito(JSON.parse(retorno)._id, this.data._id).subscribe(data => {
        this.procesando = true;
      });
    });

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
    this.auth.getProfile((retorno) => {
      console.log('usuario actual login' + JSON.parse(retorno)._id);
      this.usuarioService.sendCotizacion(JSON.parse(retorno)._id, id).subscribe(data => {
        this.procesando = true;
      });
    });
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalController.dismiss(data);
  }
}
