import { Component, OnInit, NgZone, Renderer2, AfterViewInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
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
    , public loadingCtrl: LoadingController
    , private usuarioService: UsuarioService) { }


  ngAfterViewInit(): void {
    var loader: any;
    loader = this.loadingCtrl.create({
      message: "Waiting for Data",
      duration: 2000
    }).then((res2) => {
      res2.present();

      this.buscarInfo('');
      res2.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
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

  seleccionPais(sectioinArray) {
    this.selected = sectioinArray;
    console.log('paso por aqui ' + this.selected);
    this.toggleAccordion();
    this.buscarDatos();
  }

  seleccionFamilia(sectioinArray) {
    this.selectedFamilia = sectioinArray;
    console.log('paso por aqui ' + this.selectedFamilia);
    this.toggleAccordionFamilia();
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
    this.usuarioService.getProductByLikeSlowFiltros(buscar, this.selected, this.selectedFamilia).subscribe(data => {
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
