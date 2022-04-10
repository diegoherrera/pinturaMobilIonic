import { Component, OnInit, NgZone, Renderer2, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController, LoadingController, ViewDidEnter } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AutentificacionService } from 'src/app/autentificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FiltroPage } from '../filtro/filtro.page';
import { InnovationdetallePage } from '../innovationdetalle/innovationdetalle.page';
import { ProductoPage } from '../producto/producto.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-innovacion',
  templateUrl: './innovacion.page.html',
  styleUrls: ['./innovacion.page.scss'],
})
export class InnovacionPage implements OnInit, AfterViewInit, ViewDidEnter {
  page: number = 0;
  searchString: string = '';
  regForPage: number = 10;
  datos: any = [];
  language: any = 'pg';

  RegionArray: any = [];
  FamilyArray: any = [];
  TypeArray: any = [];

  pisMenuOpen: boolean = false;

  filtrosSeleccionado: any = [];
  filtrosSeleccionadoFamilia: any = [];
  filtrosSeleccionadoTipo: any = [];
  filtrosSeleccionadoRegion: any = [];
  filtrosSeleccionadoRegulatory : any = [];
  filtrosSeleccionadoSegmento : any = [];
  

  @ViewChild("panel") panel: ElementRef;
  @ViewChild("opcion1") opcion1: ElementRef;
  @ViewChild("opcion2") opcion2: ElementRef;
  @ViewChild("primariob") primariob: ElementRef;

  constructor(public modalController: ModalController
    , private ngZone: NgZone
    , private renderer: Renderer2
    // , private storage: Storage
    , private auth: AutentificacionService
    , private keyboard: Keyboard
    , public loadingCtrl: LoadingController
    , private translateService: TranslateService
    , private usuarioService: UsuarioService) {

    /*this.storage.get('Language').then((val) => {
      //console.log('idioma tomando variable en InnovacionPage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/



  }

  ionViewDidEnter(): void {
    this.auth.getLanguage((retorno) => {
      console.log('idiona **************** ' + retorno);
      this.translateService.use(retorno);
      this.language = retorno;
    });
  }


  removeFiltroRegion(item: any) {
    this.filtrosSeleccionadoRegion = this.filtrosSeleccionadoRegion.filter(obj => obj !== item);
    this.page = 0;
    this.buscarInfo(this.page, this.searchString);
  }

  searchEnter($event) {
    console.log('apreto enter' + this.searchString);
    this.page = 0;
    this.buscarInfo(this.page, this.searchString);
    this.keyboard.hide();
  }

  removeFiltro(item: any) {

    this.filtrosSeleccionado = this.filtrosSeleccionado.filter(obj => obj !== item);
    this.buscarInfo(this.page, this.searchString);
  }

  removeFiltrofamilia(item: any) {
    this.filtrosSeleccionadoFamilia = this.filtrosSeleccionadoFamilia.filter(obj => obj !== item);
    this.page = 0;
    this.buscarInfo(this.page, this.searchString);
  }

  removeFiltrocategoria(item: any) {
    this.filtrosSeleccionadoTipo = this.filtrosSeleccionadoTipo.filter(obj => obj !== item);
    this.page = 0;
    this.buscarInfo(this.page, this.searchString);
  }

  GetFamily() {
    this.usuarioService.GetFamily().subscribe(data => {
      //console.log(data);
      this.FamilyArray = data;
    });
  }

  GetRegion() {
    this.usuarioService.getRegion().subscribe(data => {
      //console.log(data);
      this.FamilyArray = data;
    });
  }


  GetType() {
    this.usuarioService.GetType().subscribe(data => {
      //console.log(data);
      this.TypeArray = data;
    });
  }


  async pushPageFilter() {

    var registro = {};
    let modal = await this.modalController.create({
      component: FiltroPage,
      cssClass: 'my-custom-class',
      componentProps: { regulatory: this.filtrosSeleccionadoRegulatory, segmento: this.filtrosSeleccionadoSegmento, value: this.filtrosSeleccionado, region: this.filtrosSeleccionadoRegion, familia: this.filtrosSeleccionadoFamilia, tipo: this.filtrosSeleccionadoTipo, 'language': this.language }
    });

    modal.onDidDismiss().then(data => {
      //console.log('retorno ' + JSON.stringify(data));
      var retorno: any = data;
      if (retorno.data.estado) {

        this.filtrosSeleccionadoRegion = retorno.data.region;
        this.filtrosSeleccionadoFamilia = retorno.data.familia;
        this.filtrosSeleccionadoTipo = retorno.data.tipo;
        this.filtrosSeleccionado = retorno.data.filtro;
        this.filtrosSeleccionadoRegulatory = retorno.data.regulatory;
        this.filtrosSeleccionadoSegmento = retorno.data.segmento;

        /*  if (retorno.data.operacion == 1) {
            this.filtrosSeleccionadoRegion = this.filtrosSeleccionadoRegion.concat(retorno.data.seleccion);          
          }
  
          if (retorno.data.operacion == 2) {
            this.filtrosSeleccionadoFamilia = this.filtrosSeleccionadoFamilia.concat(retorno.data.seleccion);
          }
          if (retorno.data.operacion == 3) {
            this.filtrosSeleccionadoTipo = this.filtrosSeleccionadoTipo.concat(retorno.data.seleccion);
          }
  
          if (retorno.data.operacion == 4) {
            this.filtrosSeleccionado = this.filtrosSeleccionado.concat(retorno.data.seleccion);
          }*/

        //meustro la informacion
        this.page = 0;
        this.buscarInfo(this.page, this.searchString);


        //this.toggleAccordion();

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


  ngAfterViewInit(): void {
    this.buscarInfo(this.page, '');
    this.GetFamily();
    this.GetRegion();
    this.GetType();
  }

  ngOnInit() {

  }

  limpiarFiltros() {
    this.filtrosSeleccionado = [];
    this.filtrosSeleccionadoRegion = [];
    this.filtrosSeleccionadoFamilia = [];
    this.filtrosSeleccionadoTipo = [];
    this.filtrosSeleccionadoRegulatory = [];
    this.filtrosSeleccionadoSegmento = [];
    this.searchString = '';
    this.page = 0;
    this.buscarInfo(this.page, this.searchString);
  }

  async pushPage(registro) {
    const modal = await this.modalController.create({
      component: InnovationdetallePage,
      cssClass: 'my-custom-class',
      componentProps: { 'data': registro, 'language': this.language }
    });
    return await modal.present();


  }

  getItems(ev: any) {
    //console.log(ev);
    var val = ev.target.value;
    //console.log(val);
    this.buscarInfo(this.page, val);
  }

  buscarInfo(pagina: number, buscar: string) {


    //5f104255eba71db5d83b131a
    this.usuarioService.getProductByLikeInnovation(
      buscar,
      this.filtrosSeleccionado,
      this.filtrosSeleccionadoRegion,
      this.filtrosSeleccionadoFamilia,
      this.filtrosSeleccionadoTipo,
      this.filtrosSeleccionadoRegulatory,
      this.filtrosSeleccionadoSegmento
    ).subscribe(data => {
      //console.log(data);
      this.datos = data;
    });
  }

  onClear($event) {
    //console.log("Paso onClear");
    this.page = 0;
    this.buscarInfo(this.page, 'sindatos');
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
