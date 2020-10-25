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
  isMenuOpen: boolean = false;
  selected: string = '';
  imagen: string = 'assets/noimagen.png';
  @Input() data: any;
  colorpallete: any;
  altura: any = '500';
  constructor(
    private modalController: ModalController, 
    private translateService: TranslateService, 
    private auth: AutentificacionService
   // private storage: Storage
    ) {
   /* this.storage.get('Language').then((val) => {
      console.log('idioma tomando variable en DetallePage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/
  }

  ngOnInit() {

    this.auth.getLanguage((retorno) => {
      console.log('idiona **************** ' + retorno);
      this.translateService.use(retorno);
    //  this.language = retorno;
    });

    this.selected = this.data.colores[0].color;
    this.colorpallete = '#FFFFCC';
    console.log(window.innerHeight);
    this.altura = window.innerHeight;
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalController.dismiss(data);
  }

  seleccionColor(color) {
    console.log(color);
    this.imagen = color.image;
    this.selected = color.color;
    console.log('paso por aqui ' + this.selected);
    this.toggleAccordion();
  }

  toggleAccordion() {
    console.log("toggleAccordion");
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }
}
