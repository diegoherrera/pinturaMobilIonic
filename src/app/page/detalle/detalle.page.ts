import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AutentificacionService } from 'src/app/autentificacion.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  @Input() language: any;
  
  isMenuOpen: boolean = false;
  selected: string = '';
  imagen: string = 'assets/noimagen.png';
  @Input() data: any;
  colorpallete: any;
  altura: any = '500';
  coloractual: any = '';
  indice: any = '';
  pantone: any = '';
  fda: any = '';
  calimento: any = '';
  proceso: any = '';
  resistencia: any = '';
  ldr: any = '';

  constructor(
    private modalController: ModalController, 
    private translateService: TranslateService, 
    private auth: AutentificacionService
   // private storage: Storage
    ) {
   /* this.storage.get('Language').then((val) => {
      //console.log('idioma tomando variable en DetallePage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/
  }

  ngOnInit() {

    this.auth.getLanguage((retorno) => {
      //console.log('idiona **************** ' + retorno);
      this.language = retorno;
      this.translateService.use(retorno);
    //  this.language = retorno;
    });

    if (this.language == 'es') {
      this.coloractual =this.data.colores[0].description;
    } else {
      this.coloractual =this.data.colores[0].descriptionpg;
    }

    if (this.language == 'es') {
      this.proceso =this.data.colores[0].proceso;
    } else {
      this.proceso =this.data.colores[0].proceso_pg;
    }

    console.log('alimento', this.data.colores[0].type);

    if (this.language == 'es') {
      this.calimento =this.data.colores[0].type == "0" ? "Si" : "No";
    } else {
      this.calimento =this.data.colores[0].type == "0" ? "Sim" : "Não";;
    }

    console.log('LDR', this.ldr);

    this.ldr =this.data.colores[0].ldr;
    
    console.log('color', this.coloractual);

    this.indice =this.data.colores[0].indice;

    console.log('indice', this.indice);

    this.pantone =this.data.colores[0].pantone;

    console.log('pantone', this.pantone);

    this.fda =this.data.colores[0].pda;

    console.log('fda', this.fda);

    this.resistencia =this.data.colores[0].resistencia;

    this.selected = this.data.colores[0].color;
    this.colorpallete = '#FFFFCC';
    //console.log(window.innerHeight);
    this.altura = window.innerHeight;

    console.log('JSON', this.data);
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalController.dismiss(data);
  }

  seleccionColor(color) {
    console.log(color);

    this.imagen = color.image;
    this.selected = color.color;

    if (this.language == 'es') {
      this.coloractual =color.description;
    } else {
      this.coloractual =color.descriptionpg;
    }

    if (this.language == 'es') {
      this.proceso = color.proceso;
    } else {
      this.proceso = color.proceso_pg;
    }

    if (this.language == 'es') {
      this.calimento = color.type == "0" ? "Si" : "No";
    } else {
      this.calimento = color.type == "0" ? "Sim" : "Não";;
    }
    

    //this.coloractual =color.description;    

    this.ldr = color.ldr;
    this.indice =color.indice;
    this.pantone =color.pantone;
    this.fda =color.pda;
    this.resistencia =color.resistencia;
    //console.log('paso por aqui ' + this.selected);
    this.toggleAccordion();
  }

  toggleAccordion() {
    //console.log("toggleAccordion");
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }
}
