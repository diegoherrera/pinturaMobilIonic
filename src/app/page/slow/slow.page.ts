import { Component, OnInit, NgZone, Renderer2, AfterViewInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-slow',
  templateUrl: './slow.page.html',
  styleUrls: ['./slow.page.scss'],
})
export class SlowPage implements OnInit, AfterViewInit {
  isMenuOpen: boolean = false;
  selected: string = 'Todos';
  buscartexto: string = '';
  isMenuOpenFamilia: boolean = false;
  selectedFamilia: string = 'Todas';
  paises: any = [
    "Todos",
    "Mexico",
    "Argentina",
    "Brasil"
  ];

  familias: any = [
    "Todas",
    "FGAD",
    "FGBK",
    "FGCO",
    "FGWH"
  ];

  page: number = 0;
  searchString: string = '';
  regForPage: number = 10;
  datos: any = [];


  constructor(public modalController: ModalController
    , private ngZone: NgZone
    , private renderer: Renderer2
    //, private storage: Storage
    , public loadingCtrl: LoadingController
    , private translateService: TranslateService
    , private usuarioService: UsuarioService) {
    /* this.storage.get('Language').then((val) => {
       console.log('idioma tomando variable en modalController ******************** ' + val);
       this.translateService.setDefaultLang(val); // add this
     });*/

    this.page = 0;
  }


  traduccionMensajes(variable: string, callback) {
    this.translateService.get(variable).subscribe((res: string) => {
      callback(res);
    });
  }

  ngAfterViewInit(): void {
    var loader: any;
    this.traduccionMensajes("lblslowprocesando", (traduccion) => {
      loader = this.loadingCtrl.create({
        message: traduccion,
        duration: 2000
      }).then((res2) => {
        res2.present();

        this.buscarInfo('');
        res2.onDidDismiss().then((dis) => {
          console.log('Loading dismissed! after 2 Seconds', dis);
        });
      });
    });
  }

  ngOnInit() {
  }

  toggleAccordion() {
    console.log("toggleAccordion");
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }

  toggleAccordionFamilia() {
    console.log("toggleAccordion");
    if (this.isMenuOpenFamilia) {
      this.isMenuOpenFamilia = false;
    } else {
      this.isMenuOpenFamilia = true;
    }
  }


  buscarDatos() {
    var loader: any;
    loader = this.loadingCtrl.create({
      message: "Waiting for Data",
      duration: 1000
    }).then((res2) => {
      res2.present();

      this.buscarInfo(this.buscartexto);
      res2.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });
  }

  doInfinite(event) {
    this.page = this.page + 1;
    this.usuarioService.getProductByLikeSlowFiltros(this.buscartexto, this.selected, this.selectedFamilia, this.page).subscribe(data => {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          this.datos.push(data[i]);
        }
      }
      event.target.complete();
      // this.datos = data;
    });


  }


  seleccionPais(sectioinArray) {
    this.selected = sectioinArray;
    console.log('paso por aqui ' + this.selected);
    this.toggleAccordion();
    this.page = 0;
    this.buscarDatos();
  }

  seleccionFamilia(sectioinArray) {
    this.selectedFamilia = sectioinArray;
    console.log('paso por aqui ' + this.selectedFamilia);
    this.toggleAccordionFamilia();
    this.page = 0;
    this.buscarDatos();
  }


  pushPage(sectioinArray) {

    let update = sectioinArray.State;
    if (update) update = false;
    else update = true;
    this.usuarioService.updateProductSlow(sectioinArray._id, update).subscribe(data => {
      sectioinArray.State = false;
    })

  }

  getItems(ev: any) {
    console.log(ev);
    var val = ev.target.value;
    console.log(val);
    this.buscartexto = val;
    //this.buscarInfo(val);
    if (val.length > 3) {
      this.buscarDatos();
    }

    if (val.length == 0) {
      this.buscarDatos();
    }
  }

  buscarInfo(buscar: string) {
    this.usuarioService.getProductByLikeSlowFiltros(buscar, this.selected, this.selectedFamilia, this.page).subscribe(data => {
      console.log(data);
      this.datos = data;
    });
  }

  onClear($event) {
    console.log("Paso onClear");
    this.page = 0;
    this.buscarInfo('sindatos');
  }


  onCancel($event) {
    console.log("Paso por onCancel");
    this.page = 0;
    this.buscarInfo('sindatos');
  }


}
