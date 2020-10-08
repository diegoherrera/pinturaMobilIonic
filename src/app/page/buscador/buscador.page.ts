import { Component, OnInit, NgZone, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ProductoPage } from '../producto/producto.page';
import { ModalController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { zip } from 'rxjs';
import { SincronizarPage } from '../sincronizar/sincronizar.page';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit, AfterViewInit {
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

  constructor(
    public modalController: ModalController
    , private ngZone: NgZone
    , private renderer: Renderer2
    , public loadingCtrl: LoadingController
    , private usuarioService: UsuarioService) {



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
    loader = this.loadingCtrl.create({
      message: "looking for product",
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


  }


  ngAfterViewInit(): void {
    this.renderer.removeClass(this.segmento.nativeElement, "inactive");
    this.renderer.addClass(this.primario.nativeElement, "active");
    this.renderer.addClass(this.primariob.nativeElement, "active");
    this.renderer.addClass(this.secundario.nativeElement, "inactive");
    var loader: any;
    loader = this.loadingCtrl.create({
      message: "Waiting for Data",
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

  removeFiltro(item: any) {
    this.filtrosSeleccionado = this.filtrosSeleccionado.filter(obj => obj !== item);
  }

  async pushPageFilter() {
    var registro = {};
    let modal = await this.modalController.create({
      component: SincronizarPage,
      cssClass: 'my-custom-class',
      componentProps: { value: this.filtrosSeleccionado }
    });

    modal.onDidDismiss().then(data => {
      console.log('retorno ' + JSON.stringify(data));
      if (data.data.estado) {
        this.filtrosSeleccionado.push(data.data);
      }

    });

    return await modal.present();
  }

  async pushPage(registro) {
    const modal = await this.modalController.create({
      component: ProductoPage,
      cssClass: 'my-custom-class',
      componentProps: { 'data': registro }
    });
    return await modal.present();
  }


  getItems(ev: any) {
    console.log(ev);
    var val = ev.target.value;
    console.log(val);
    if (val != "" && val.length > 3) {
      console.log("Paso por getItems");
      this.renderer.removeClass(this.primario.nativeElement, "active");
      this.renderer.removeClass(this.primariob.nativeElement, "active");
      this.renderer.removeClass(this.secundario.nativeElement, "inactive");

      this.renderer.addClass(this.primario.nativeElement, "inactive");
      this.renderer.addClass(this.primariob.nativeElement, "inactive");
      this.renderer.addClass(this.secundario.nativeElement, "active");

      this.SegmentArrayFilter = [];
      this.FamilyArrayFilter = [];
      this.TypeArrayFilter = [];
      this.ProductArrayFilter = [];

      this.SegmentArrayFilter = this.SegmentArray.filter(x => {
       // console.log(x);
        let buscar = val.toUpperCase();
        return x.segment_name.toUpperCase().includes(buscar);
      });

      this.FamilyArrayFilter = this.FamilyArray.filter(x => {
        //console.log(x);
        let buscar = val.toUpperCase();
        return x.family_name.toUpperCase().includes(buscar);
      });

      this.TypeArrayFilter = this.TypeArray.filter(x => {
       // console.log(x);
        let buscar = val.toUpperCase();
        return x.category_name.toUpperCase().includes(buscar);
      });

      this.usuarioService.getProductByLike(val.toUpperCase()).subscribe(data => {
        console.log('producto buscado ' + JSON.stringify(data));
        this.ProductArrayFilter = data;
      });


    } else {
      if (val == "") {
        this.renderer.removeClass(this.primario.nativeElement, "inactive");
        this.renderer.removeClass(this.primariob.nativeElement, "inactive");
        this.renderer.removeClass(this.secundario.nativeElement, "active");

        this.renderer.addClass(this.primario.nativeElement, "active");
        this.renderer.addClass(this.primariob.nativeElement, "active");
        this.renderer.addClass(this.secundario.nativeElement, "inactive");
      }
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
