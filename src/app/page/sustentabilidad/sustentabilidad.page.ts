import { Component, OnInit, NgZone, Renderer2, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProductoPage } from '../producto/producto.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AutentificacionService } from 'src/app/autentificacion.service';
import { FiltrosustentablePage } from '../filtrosustentable/filtrosustentable.page';

@Component({
  selector: 'app-sustentabilidad',
  templateUrl: './sustentabilidad.page.html',
  styleUrls: ['./sustentabilidad.page.scss'],
})
export class SustentabilidadPage implements OnInit, AfterViewInit {
  page: number = 0;
  searchString: string = '';
  regForPage: number = 10;
  datos: any = [];
  language: any = 'pg';

  pisMenuOpen: boolean = false;

  RegionArray: any = [];
  FamilyArray: any = [];
  TypeArray: any = [];
  filtrosSeleccionadoPolimero: any = [];
  filtrosSeleccionadoProducto: any = [];
  filtrosSeleccionadoProceso: any = [];

  @ViewChild("panel") panel: ElementRef;
  @ViewChild("opcion1") opcion1: ElementRef;
  @ViewChild("opcion2") opcion2: ElementRef;
  @ViewChild("primariob") primariob: ElementRef;
  

  constructor(public modalController: ModalController
    , private ngZone: NgZone
    // , private storage: Storage
    , private renderer: Renderer2
    , private auth: AutentificacionService
    , private keyboard: Keyboard
    , public loadingCtrl: LoadingController
    , private translateService: TranslateService
    , private usuarioService: UsuarioService) {

    /* this.storage.get('Language').then((val) => {
       //console.log('idioma tomando variable en SustentabilidadPage ******************** ' + val);
       this.translateService.setDefaultLang(val); // add this
     });*/
  }

  searchEnter($event) {
    console.log('apreto enter');
    this.page = 0;
    this.buscarInfo(this.page, this.searchString);
    this.keyboard.hide();
  }


  removeFiltroPolimetro(item: any) {

    this.filtrosSeleccionadoPolimero = this.filtrosSeleccionadoPolimero.filter(obj => obj !== item);
    this.buscarInfo(this.page, this.searchString);
  }

  removeFiltroProceso(item: any) {
    this.filtrosSeleccionadoProceso = this.filtrosSeleccionadoProceso.filter(obj => obj !== item);    
    this.page=0;
    this.buscarInfo(this.page, this.searchString); 
  }

  removeFiltroProducto(item: any) {
    this.filtrosSeleccionadoProducto = this.filtrosSeleccionadoProducto.filter(obj => obj !== item);    
    this.page=0;
    this.buscarInfo(this.page, this.searchString); 
  }


  async pushPageFilter() {
    
    var registro = {};
    let modal = await this.modalController.create({
      component: FiltrosustentablePage,
      cssClass: 'my-custom-class',
      componentProps: { proceso: this.filtrosSeleccionadoProceso, producto: this.filtrosSeleccionadoProducto, polimero: this.filtrosSeleccionadoPolimero,  'language': this.language }
    });

    modal.onDidDismiss().then(data => {
      console.log('retorno ' + JSON.stringify(data));
      var retorno: any = data;
      if (retorno.data.estado) {


        if (retorno.data.operacion == 2) {
          this.filtrosSeleccionadoProceso = this.filtrosSeleccionadoProceso.concat(retorno.data.seleccion);          
        }

        if (retorno.data.operacion == 1) {
          this.filtrosSeleccionadoProducto = this.filtrosSeleccionadoProducto.concat(retorno.data.seleccion);
        }
        if (retorno.data.operacion == 3) {
          this.filtrosSeleccionadoPolimero = this.filtrosSeleccionadoPolimero.concat(retorno.data.seleccion);
        }

      
        
        //meustro la informacion
        this.page=0;
        this.buscarInfo(this.page, this.searchString);


        this.toggleAccordion();

      }
    });

    return await modal.present();

  }

  toggleAccordion() {
    //console.log("toggleAccordion");
    if (this.pisMenuOpen) {
      this.pisMenuOpen = false;
      this.renderer.addClass(this.panel.nativeElement, "inactive");
      this.renderer.removeClass(this.opcion1.nativeElement, "active");
      this.renderer.addClass(this.opcion1.nativeElement, "inactive");

      this.renderer.removeClass(this.opcion2.nativeElement, "inactive");
      this.renderer.addClass(this.opcion2.nativeElement, "active");

    } else {
      this.renderer.removeClass(this.panel.nativeElement, "inactive");

      this.renderer.removeClass(this.opcion2.nativeElement, "active");
      this.renderer.addClass(this.opcion2.nativeElement, "inactive");
      this.renderer.removeClass(this.opcion1.nativeElement, "inactive");
      this.renderer.addClass(this.opcion1.nativeElement, "active");
      this.pisMenuOpen = true;
    }
  }

  limpiarFiltros() {
    this.filtrosSeleccionadoPolimero = [];
    this.filtrosSeleccionadoProceso = [];    
    this.filtrosSeleccionadoProducto = [];
    
    this.searchString = '';    
    this.page=0;
    this.buscarInfo(this.page, this.searchString); 
  }



  ngAfterViewInit(): void {
    this.buscarInfo(this.page, '');
    //console.log('idioma ******************* ' + this.language);

    this.auth.getLanguage((retorno) => {
      console.log('idiona **************** ' + retorno);
      this.translateService.use(retorno);
      this.language = retorno;
    });
  }

  updateUrl($event, sectioinArray) {
    //console.log('$event.target.src ' + $event.target.src);
    sectioinArray.agrupacion_product_Id.product_image = '';
    /*if ($event.target.src != '') {
      //console.log('llego por aquiiiiiiiiiiiiiii');
      //console.log(JSON.stringify())
      $event.target.src = '';
    }*/
  }

  ngOnInit() {
  }


  getItems(ev: any) {
    //console.log(ev);
    var val = ev.target.value;
    //console.log(val);
    this.buscarInfo(this.page, val);
  }

  buscarInfo(pagina: number, buscar: string) {
    //5f104255eba71db5d83b131a
    if (buscar == '') {
      buscar = 'sindatos';
    }
    this.usuarioService.GetProducGroup("5f10424deba71db5d83b1318"
    , this.filtrosSeleccionadoPolimero
    , this.filtrosSeleccionadoProceso
    , this.filtrosSeleccionadoProducto
    , buscar
    , pagina).subscribe(data => {
      //console.log('***********');
      //console.log(data);
      //console.log('***********');
      this.datos = data;
    });
  }

  onClear($event) {
    //console.log("Paso onClear");
    this.page = 0;
    this.buscarInfo(this.page, 'sindatos');
  }

  async pushPage(registro) {
    this.usuarioService.getProductById(registro.agrupacion_product_Id._id).subscribe(async data => {
      //console.log('registro completo ' + JSON.stringify(data));
      console.log(JSON.stringify(registro));

      let producto: any = {};
      let proceso: any = {};
      let polimero : any = {};

      if (registro.agrupacion_IdProceso.procesosustentables_name == 'sin datos') {
        proceso = '';
      } else {
        proceso = registro.agrupacion_IdProceso;
      }
      if (registro.agrupacion_IdProducto.productossustentables_name == 'sin datos') {
        producto = '';
      } else {
        producto = registro.agrupacion_IdProducto;
      }

      /*if (registro.agrupacion_IdPolimero.polimerosustentable_name == 'sin datos') {
        polimero = '';
      } else {
        polimero = registro.agrupacion_IdPolimero;
      }*/

      const modal = await this.modalController.create({
        component: ProductoPage,
        cssClass: 'my-custom-class',
        componentProps: { 'data': data.products, 'sustentable': true, 'language': this.language, 'proceso': proceso, 'producto': producto, 'polimero': polimero }
      });
      return await modal.present();
    });
  }

  onCancel($event) {
    //console.log("Paso por onCancel");
    this.page = 0;
    this.buscarInfo(this.page, 'sindatos');
  }

  doInfinite(event) {
    this.page++;
    this.buscarInfo(this.page, this.searchString);
  }

}
