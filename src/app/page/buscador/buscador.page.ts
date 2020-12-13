import { Component, OnInit, NgZone, ViewChild, ElementRef, Renderer2, AfterViewInit, ɵConsole } from '@angular/core';
import { ProductoPage } from '../producto/producto.page';
import { ModalController, LoadingController, IonContent } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { zip } from 'rxjs';
import { SincronizarPage } from '../sincronizar/sincronizar.page';
import { TranslateService } from '@ngx-translate/core';
import { AutentificacionService } from 'src/app/autentificacion.service';
import { ConnectionStatus, NetworkService } from 'src/app/network.service';
import { DbcacheService } from 'src/app/dbcache.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit, AfterViewInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild("favorito") favorito: ElementRef;
  @ViewChild("family") family: ElementRef;
  @ViewChild("segmento") segmento: ElementRef;
  @ViewChild("type") type: ElementRef;
  @ViewChild("producto") producto: ElementRef;
  @ViewChild("panel") panel: ElementRef;
  @ViewChild("opcion1") opcion1: ElementRef;
  @ViewChild("opcion2") opcion2: ElementRef;

  @ViewChild("primario") primario: ElementRef;
  @ViewChild("primariob") primariob: ElementRef;
  @ViewChild("secundario") secundario: ElementRef;

  filtrosSeleccionado: any = [];
  filtrosSeleccionadoSegmento: any = [];
  filtrosSeleccionadoFamilia: any = [];
  filtrosSeleccionadoTipo: any = [];

  searchString: string = '';
  navigate: any;
  pisMenuOpen: boolean = false;
  nivel1: any = '';
  nivel2: any = '';
  nivel3: any = '';
  filtro1: boolean = true;
  filtro2: boolean = false;
  filtro3: boolean = false;
  filtro4: boolean = false;
  SegmentArray: any = [];
  FamilyArray: any = [];
  TypeArray: any = [];
  ProductArray: any = [];
  SegmentArrayFilter: any = [];
  FamilyArrayFilter: any = [];
  TypeArrayFilter: any = [];
  ProductArrayFilter: any = [];
  FavoritoArray: any = [];
  buscando: string = '';
  language: any = 'pg';
  pagina: number = 0;
  micantidad: number = 0;

  constructor(
    public modalController: ModalController
    , private ngZone: NgZone
    , private renderer: Renderer2
    , public loadingCtrl: LoadingController
    , private translateService: TranslateService
    , private auth: AutentificacionService
    , private dbcacheService: DbcacheService
    , private networkService: NetworkService
    , private usuarioService: UsuarioService) {

    /* this.storage.get('Language').then((val) => {
       console.log('idioma tomando variable en BuscadorPage ******************** ' + val);
       this.translateService.setDefaultLang(val); // add this
     });*/

    this.auth.getLanguage((retorno) => {
      console.log('idiona **************** ' + retorno);
      this.translateService.use(retorno);
      this.language = retorno;
    });

    this.pagina = 0;


  }

  isHasConnection() {
    return false;
    // return this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ? false: true;
  }

  traduccionMensajes(variable: string, callback) {
    this.translateService.get(variable).subscribe((res: string) => {
      callback(res);
    });
  }

  updateUrlFavorito($event, sectioinArray) {
    sectioinArray.favorito_product_Id.product_image = '';
  }

  updateUrlHome($event, sectioinArray) {
    sectioinArray.product_image = '';
  }

  getSegment() {
    this.usuarioService.GetSegment().subscribe(data => {
      console.log(data);
      this.SegmentArray = data;
    });
  }

  GetFamily() {
    this.usuarioService.GetFamily().subscribe(data => {
      console.log(data);
      this.FamilyArray = data;
    });
  }

  GetType() {
    this.usuarioService.GetType().subscribe(data => {
      console.log(data);
      this.TypeArray = data;
    });
  }

  GetFavorito() {
    this.auth.getProfile((retorno) => {
      if (this.isHasConnection()) {
        this.usuarioService.GetFavorito(JSON.parse(retorno)._id).subscribe(data => {
          this.content.scrollToTop(0);
          this.FavoritoArray = data;
        });
      } else {
        //modo offline
        console.log('trabajando modo offline  GetFavorito');
        this.dbcacheService.GetFavoritos(JSON.parse(retorno)._id, (resultado) => {
          console.log('favoritos devueltos ' + resultado.length);
          console.log('favoritos devueltos ' + JSON.stringify(resultado));
          this.content.scrollToTop(0);
          this.FavoritoArray = [];
          this.FavoritoArray = resultado;
        })
      }
    });
  }


  getProductCount() {
    this.pagina = 0;
    this.auth.getProfile((retorno) => {
      this.usuarioService.GetProducByHomeCount(
        this.filtrosSeleccionadoSegmento,
        this.filtrosSeleccionadoFamilia,
        this.filtrosSeleccionadoTipo,
        this.filtrosSeleccionado,
        this.buscando,
        JSON.parse(retorno).user_comercializacion,
        this.pagina).subscribe(data => {
          // console.log('llego xxxxxxxxxxxxxxx ' + data.total);

          this.micantidad = data.total;
        });
    });
  }


  getProduct() {
    this.auth.getProfile((retorno) => {
      if (this.isHasConnection()) {
        this.getProductCount();
        this.pagina = 0;
        this.usuarioService.GetProducByHome(
          this.filtrosSeleccionadoSegmento,
          this.filtrosSeleccionadoFamilia,
          this.filtrosSeleccionadoTipo,
          this.filtrosSeleccionado,
          this.buscando,
          JSON.parse(retorno).user_comercializacion,
          this.pagina).subscribe(data => {
            //console.log('informacion ' + JSON.stringify(data));
            this.content.scrollToTop(0);
            this.ProductArray = data.products;
          });

      } else {
        // modo offline
        console.log('Modo offline getProduct()');
        this.dbcacheService.GetProductos(
          this.filtrosSeleccionadoSegmento,
          this.filtrosSeleccionadoFamilia,
          this.filtrosSeleccionadoTipo,
          this.filtrosSeleccionado,
          this.buscando,
          JSON.parse(retorno).user_comercializacion, (resultado) => {
            this.micantidad = resultado.length;
            console.log('informacion ' + JSON.stringify(resultado));
            this.content.scrollToTop(0);
            this.ProductArray = resultado.slice(1, 14); 
          });
      }
    });

  }


  async pushPageFavorito(registro) {
    if (this.isHasConnection()) {
      this.usuarioService.getProductById(registro._id).subscribe(async data => {
        console.log('registro completo ' + JSON.stringify(data));
        //console.log(JSON.stringify(registro));
        const modal = await this.modalController.create({
          component: ProductoPage,
          cssClass: 'my-custom-class',
          componentProps: { 'data': data.products }
        });
        return await modal.present();
      });
    } else {
      console.log('trabajando modo offline para detalle');
      this.dbcacheService.GetProductoFavorito(registro._id, async (resultado) => {
        console.log(JSON.stringify(resultado));
        const modal = await this.modalController.create({
          component: ProductoPage,
          cssClass: 'my-custom-class',
          componentProps: { 'data': resultado[0] }
        });
        return await modal.present();
      });
    }
  }

  seleccionarSegmento(selected) {
    console.log('llego a la seleccion');
    this.nivel1 = selected;
    this.renderer.addClass(this.segmento.nativeElement, "inactive");
    this.renderer.removeClass(this.family.nativeElement, "inactive");

  }


  seleccionarFamilia(selected) {
    console.log('llego a la seleccion');
    this.nivel2 = selected;
    this.renderer.addClass(this.family.nativeElement, "inactive");
    this.renderer.removeClass(this.type.nativeElement, "inactive");

  }

  seleccionarType(selected) {
    console.log('llego a la seleccion');
    this.nivel3 = selected;
    this.renderer.addClass(this.type.nativeElement, "inactive");
    this.renderer.removeClass(this.producto.nativeElement, "inactive");
    this.seleccionarProductos();
  }

  seleccionarProductos() {
    var loader: any;
    this.traduccionMensajes("lblbuscandoproductos", (traduccion) => {
      loader = this.loadingCtrl.create({
        message: traduccion,
        duration: 5000
      }).then((res2) => {
        res2.present();
        console.log('llego a la seleccion');
        this.usuarioService.GetProduc(this.nivel1._id, this.nivel2._id, this.nivel3._id).subscribe(data => {
          console.log('informacion ' + JSON.stringify(data));
          this.ProductArray = data.products;
          res2.dismiss(); //sierro el dialogo
        });
        res2.onDidDismiss().then((dis) => {
          console.log('Loading dismissed! after 2 Seconds', dis);
        });
      });
    });
  }


  ngAfterViewInit(): void {
    //this.renderer.removeClass(this.segmento.nativeElement, "inactive");
    this.renderer.addClass(this.primario.nativeElement, "active");
    this.renderer.addClass(this.primariob.nativeElement, "active");
    this.renderer.addClass(this.secundario.nativeElement, "inactive");
    var loader: any;

    this.GetFavorito();
    /*
     this.traduccionMensajes("lblesperandodatos", (traduccion) => {
       loader = this.loadingCtrl.create({
         message: traduccion,
         duration: 3000
       }).then((res2) => {
         res2.present();
 
         this.getSegment();
         this.GetFamily();
         this.GetType();
 
         res2.onDidDismiss().then((dis) => {
           console.log('Loading dismissed! after 2 Seconds', dis);
         });
       });
     });*/
  }

  limpiar(nivel) {
    console.log('paso por limpiar' + nivel);
    this.filtro1 = false;
    if (nivel == 1) {
      console.log('1');
      this.nivel1 = '';
      this.nivel2 = '';
      this.nivel3 = '';
      this.renderer.removeClass(this.segmento.nativeElement, "active");
      this.renderer.removeClass(this.family.nativeElement, "active");
      this.renderer.removeClass(this.type.nativeElement, "active");
      this.renderer.removeClass(this.producto.nativeElement, "active");
      this.renderer.removeClass(this.segmento.nativeElement, "inactive");
      this.renderer.removeClass(this.family.nativeElement, "inactive");
      this.renderer.removeClass(this.type.nativeElement, "inactive");
      this.renderer.removeClass(this.producto.nativeElement, "inactive");

      this.renderer.addClass(this.segmento.nativeElement, "active");
      this.renderer.addClass(this.family.nativeElement, "inactive");
      this.renderer.addClass(this.type.nativeElement, "inactive");
      this.renderer.addClass(this.producto.nativeElement, "inactive");
    }
    if (nivel == 2) {
      console.log('2');
      this.nivel2 = '';
      this.nivel3 = '';
      this.renderer.removeClass(this.segmento.nativeElement, "active");
      this.renderer.removeClass(this.family.nativeElement, "active");
      this.renderer.removeClass(this.type.nativeElement, "active");
      this.renderer.removeClass(this.producto.nativeElement, "active");
      this.renderer.removeClass(this.segmento.nativeElement, "inactive");
      this.renderer.removeClass(this.family.nativeElement, "inactive");
      this.renderer.removeClass(this.type.nativeElement, "inactive");
      this.renderer.removeClass(this.producto.nativeElement, "inactive");

      this.renderer.addClass(this.segmento.nativeElement, "inactive");
      this.renderer.addClass(this.family.nativeElement, "active");
      this.renderer.addClass(this.type.nativeElement, "inactive");
      this.renderer.addClass(this.producto.nativeElement, "inactive");
    }
    if (nivel == 3) {
      console.log('3');
      this.nivel3 = '';
      this.renderer.removeClass(this.segmento.nativeElement, "active");
      this.renderer.removeClass(this.family.nativeElement, "active");
      this.renderer.removeClass(this.type.nativeElement, "active");
      this.renderer.removeClass(this.producto.nativeElement, "active");
      this.renderer.removeClass(this.segmento.nativeElement, "inactive");
      this.renderer.removeClass(this.family.nativeElement, "inactive");
      this.renderer.removeClass(this.type.nativeElement, "inactive");
      this.renderer.removeClass(this.producto.nativeElement, "inactive");

      this.renderer.addClass(this.segmento.nativeElement, "inactive");
      this.renderer.addClass(this.family.nativeElement, "inactive");
      this.renderer.addClass(this.type.nativeElement, "active");
      this.renderer.addClass(this.producto.nativeElement, "inactive");

    }
  }

  nextPage() {

  }

  ngOnInit() {

  }

  limpiarFiltros() {
    this.filtrosSeleccionado = [];
    this.filtrosSeleccionadoSegmento = [];
    this.filtrosSeleccionadoFamilia = [];
    this.filtrosSeleccionadoTipo = [];

    this.renderer.removeClass(this.favorito.nativeElement, "inactive");
    this.renderer.addClass(this.favorito.nativeElement, "active");

    this.renderer.addClass(this.producto.nativeElement, "inactive");
    this.renderer.removeClass(this.producto.nativeElement, "active");

    this.searchString = '';
    this.buscando = '';
    this.GetFavorito();
  }

  removeFiltro(item: any) {

    this.filtrosSeleccionado = this.filtrosSeleccionado.filter(obj => obj !== item);
    this.getProduct();
  }

  removeFiltroSegment(item: any) {
    this.filtrosSeleccionadoSegmento = this.filtrosSeleccionadoSegmento.filter(obj => obj !== item);
    this.getProduct();
  }

  removeFiltrofamilia(item: any) {
    this.filtrosSeleccionadoFamilia = this.filtrosSeleccionadoFamilia.filter(obj => obj !== item);
    this.getProduct();
  }

  removeFiltrocategoria(item: any) {
    this.filtrosSeleccionadoTipo = this.filtrosSeleccionadoTipo.filter(obj => obj !== item);
    this.getProduct();
  }


  doInfinite(event) {
    if (this.isHasConnection()) {
      this.pagina = this.pagina + 1;
      this.auth.getProfile((retorno) => {
        this.usuarioService.GetProducByHome(
          this.filtrosSeleccionadoSegmento,
          this.filtrosSeleccionadoFamilia,
          this.filtrosSeleccionadoTipo,
          this.filtrosSeleccionado,
          this.buscando,
          JSON.parse(retorno).user_comercializacion,
          this.pagina).subscribe(data => {
            if (data.products.length > 0) {
              for (let i = 0; i < data.products.length; i++) {
                this.ProductArray.push(data.products[i]);
              }
            }
            event.target.complete();
          });
      });
    }    
  }

  async pushPageFilter() {
    console.log('lelgo al pushPageFilter ' + JSON.stringify({ value: this.filtrosSeleccionado, segmento: this.filtrosSeleccionadoSegmento, familia: this.filtrosSeleccionadoFamilia, tipo: this.filtrosSeleccionadoTipo }));

    var registro = {};
    let modal = await this.modalController.create({
      component: SincronizarPage,
      cssClass: 'my-custom-class',
      componentProps: { value: this.filtrosSeleccionado, segmento: this.filtrosSeleccionadoSegmento, familia: this.filtrosSeleccionadoFamilia, tipo: this.filtrosSeleccionadoTipo }
    });

    modal.onDidDismiss().then(data => {
      console.log('retorno ' + JSON.stringify(data));
      var retorno: any = data;
      if (retorno.data.estado) {


        if (retorno.data.operacion == 1) {
          console.log('entro por opcion 1');
          this.filtrosSeleccionadoSegmento = this.filtrosSeleccionadoSegmento.concat(retorno.data.seleccion);
          console.log('this.retorno.data.seleccion operacion 1 ' + JSON.stringify(retorno.data.seleccion));
          console.log('this.filtrosSeleccionado ' + JSON.stringify(this.filtrosSeleccionadoSegmento));
        }
        if (retorno.data.operacion == 2) {
          console.log('entro por opcion 2');
          this.filtrosSeleccionadoFamilia = this.filtrosSeleccionadoFamilia.concat(retorno.data.seleccion);
          console.log('this.retorno.data.seleccion operacion 2 ' + JSON.stringify(retorno.data.seleccion));
          console.log('this.filtrosSeleccionado ' + JSON.stringify(this.filtrosSeleccionadoFamilia));
        }
        if (retorno.data.operacion == 3) {
          console.log('entro por opcion 3');
          this.filtrosSeleccionadoTipo = this.filtrosSeleccionadoTipo.concat(retorno.data.seleccion);
          console.log('this.retorno.data.seleccion operacion 2 ' + JSON.stringify(retorno.data.seleccion));
          console.log('this.filtrosSeleccionado ' + JSON.stringify(this.filtrosSeleccionadoTipo));
        }
        if (retorno.data.operacion == 4) {
          this.filtrosSeleccionado = this.filtrosSeleccionado.concat(retorno.data.seleccion);
          console.log('this.retorno.data.seleccion  opcion 4' + JSON.stringify(retorno.data.seleccion));
          console.log('this.filtrosSeleccionado ' + JSON.stringify(this.filtrosSeleccionado));

        }
        this.getProduct();

        this.renderer.removeClass(this.producto.nativeElement, "inactive");
        this.renderer.addClass(this.producto.nativeElement, "active");

        this.renderer.addClass(this.favorito.nativeElement, "inactive");
        this.renderer.removeClass(this.favorito.nativeElement, "active");



      }
    });

    return await modal.present();

  }

  async pushPage(registro) {
    const modal = await this.modalController.create({
      component: ProductoPage,
      cssClass: 'my-custom-class',
      componentProps: { 'data': registro, 'language': this.language }
    });
    return await modal.present();
  }

  trabajodepaneles() {
    this.renderer.removeClass(this.producto.nativeElement, "inactive");
    this.renderer.addClass(this.producto.nativeElement, "active");
    this.renderer.addClass(this.favorito.nativeElement, "inactive");
    this.renderer.removeClass(this.favorito.nativeElement, "active");
  }

  getItems(ev: any) {
    console.log(ev);
    var val = ev.target.value;
    console.log(val);
    if (val != "" && val.length > 3) {
      console.log("Paso por getItems");
      this.buscando = val;
      this.getProduct();
      this.trabajodepaneles();
    } else {
      this.buscando = '';
      this.getProduct();
      this.trabajodepaneles();
    }
  }

  seleccionarProductoPorSegmento(sectioinArray) {
    this.usuarioService.GetProduc(sectioinArray._id, '', '').subscribe(data => {
      console.log('informacion ' + JSON.stringify(data));
      this.ProductArrayFilter = data.products;
    });
  }
  seleccionarProductoPorFamilia(sectioinArray) {
    this.usuarioService.GetProduc('', sectioinArray._id, '').subscribe(data => {
      console.log('informacion ' + JSON.stringify(data));
      this.ProductArrayFilter = data.products;
    });
  }
  seleccionarProductoPorType(sectioinArray) {
    this.usuarioService.GetProduc('', '', sectioinArray._id).subscribe(data => {
      console.log('informacion ' + JSON.stringify(data));
      this.ProductArrayFilter = data.products;
    });
  }

  onClear($event) {
    console.log("Paso onClear");
    this.renderer.removeClass(this.primario.nativeElement, "inactive");
    this.renderer.removeClass(this.primariob.nativeElement, "inactive");
    this.renderer.removeClass(this.secundario.nativeElement, "active");
    this.renderer.addClass(this.primario.nativeElement, "active");
    this.renderer.addClass(this.primariob.nativeElement, "active");
    this.renderer.addClass(this.secundario.nativeElement, "inactive");
  }


  onCancel($event) {
    console.log("Paso por onCancel");

  }


  toggleAccordion() {
    console.log("toggleAccordion");
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
}
