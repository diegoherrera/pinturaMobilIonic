import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-innovationdetalle',
  templateUrl: './innovationdetalle.page.html',
  styleUrls: ['./innovationdetalle.page.scss'],
})
export class InnovationdetallePage implements OnInit, ViewDidEnter, AfterViewInit {

  @Input() data: any;
  @Input() language: any;

  campoproblema1: boolean = false;
  campoproblema2: boolean = false;
  campoproblema3: boolean = false;

  regulatoryArray: any = [];

  procesando = false;

  constructor(
    private modalController: ModalController
    , private usuarioService: UsuarioService
    , private translateService: TranslateService
    //, private storage: Storage
    ) {

  /*  this.storage.get('Language').then((val) => {
      //console.log('idioma tomando variable en InnovationdetallePage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/

    this.procesando = false;
  }
  
  ngAfterViewInit(): void {
    this.getRegulatory();
  }

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

  ionViewDidEnter(): void {
    console.log('idiona **************** ' + this.language);
    if (this.data.product_Extrusion_plana_de_películas) this.campoproblema1 = true;
    if (this.data.product_Coextrusión_y_Laminacion_de_peliculas_sopladas) this.campoproblema2 = true;
    if (this.data.product_Extrusión_de_Perfiles_y_Placas_Termo_formadas_multi_capas) this.campoproblema3 = true;
  }

  ngOnInit() {
    //console.log(this.data);
    //console.log(this.language);
  }

  pushPage(id) {
    this.procesando = true;
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalController.dismiss(data);
  }

}
