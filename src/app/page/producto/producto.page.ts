import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AutentificacionService } from 'src/app/autentificacion.service';
import { NetworkService } from 'src/app/network.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit, AfterViewInit {
  @Input() data: any;
  @Input() language: any;
  @Input() sustentable: any;
  @Input() producto: any;
  @Input() proceso: any;
  @Input() polimero: any;

  regulatoryArray: any = [];

  procesando = false;
  showDataEs = true;
  showDataPg = true;

  getRegulatory() {
    this.usuarioService.GetRegulatory().subscribe(dataregulatory => {
     // this.regulatoryArray = data;
      let coderegulatory: any =  dataregulatory;

      console.log('data ', this.data.product_IdRegulatory);
      
      let arreglo = this.data.product_IdRegulatory!= undefined && this.data.product_IdRegulatory!='' ? this.data.product_IdRegulatory.split(',') : [];

      console.log('arreglo' , arreglo);

      for (let j = 0; j < coderegulatory.length; j++) {
        for (let i = 0; i < arreglo.length; i++) {
          if ('[' + coderegulatory[j]._id + ']' == arreglo[i]) {
            this.regulatoryArray.push(coderegulatory[j]);
          }
        }
      }

      console.log('lo que queda' , this.regulatoryArray);
    });
  }


  constructor(private modalController: ModalController
    , private translateService: TranslateService
    , private usuarioService: UsuarioService
    , public loadingCtrl: LoadingController
    , private auth: AutentificacionService
    , private networkService: NetworkService
    //, private storage: Storage
  ) {
    this.procesando = false;
    /*this.storage.get('Language').then((val) => {
      //console.log('idioma tomando variable en ProductoPage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/

    
  }
  ngAfterViewInit(): void {
    console.log('llega por lenguaje ' + this.language);
   if (this.language == 'es') {
    this.showDataEs = true;
    this.showDataPg = false;
   } else  {
    this.showDataEs = false;
    this.showDataPg = true;
   }
    
    console.log('data ', this.data);
    //console.log('regulatory ', this.data.product_IdRegulatory.regulatory_name)

    this.getRegulatory();


  }

  isHasConnection() {
    return true;
    // return this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ? false: true;
  }


  idiomaEs() {
    return true; 
  }

  idiomaPg() {    
    return true; 
  }

  ngOnInit() {
    //console.log(this.data);

    this.auth.getLanguage((retorno) => {
      //console.log('idiona **************** ' + retorno);
      this.translateService.use(retorno);
      this.language = retorno;
    });
    if (this.isHasConnection()) {
      this.auth.getProfile((retorno) => {
        //console.log('usuario actual login' + JSON.parse(retorno)._id);
        this.usuarioService.addFavorito(JSON.parse(retorno)._id, this.data._id).subscribe(data => {
          this.procesando = false;
        });
      });
    }   else {
      //console.log('condicion modo offline');
    }

  }

  updateUrl($event, sectioinArray) {
    //console.log('xxxxxxxxxxx $event.target.src ' + $event.target.src);
    sectioinArray.product_image = '';
    /*if ($event.target.src != '') {
      console.log('llego por aquiiiiiiiiiiiiiii');
      //console.log(JSON.stringify())
      $event.target.src = '';
    }*/
  }

  verificarIdioma( callback ) {
    this.auth.getLanguage((retorno) => {
      callback(retorno);
    });
  }

  traduccionMensajes(variable: string, callback) {
    this.translateService.get(variable).subscribe((res: string) => {
      callback(res);
    });
  }

  validarsiexistecampo(item) {
     return (item != null && item != '') ? true : false;
  }

  pushPage(id) {
    if (this.isHasConnection()) {
      this.auth.getProfile((retorno) => {
        //console.log('usuario actual login' + JSON.parse(retorno)._id);

        var loader: any;
        this.traduccionMensajes("lblslowregistramoscotizacion", (traduccion) => {
          loader = this.loadingCtrl.create({
            message: traduccion,
            duration: 2000
          }).then((res2) => {
            res2.present();

            this.usuarioService.sendCotizacion(JSON.parse(retorno)._id, id).subscribe(data => {
              this.procesando = true;          
            });
            
            res2.onDidDismiss().then((dis) => {
              //console.log('Loading dismissed! after 2 Seconds', dis);
            });
          });
        });

        
      });
    } else {
      //console.log('condicion modo offline');
    }    
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalController.dismiss(data);
  }
}
