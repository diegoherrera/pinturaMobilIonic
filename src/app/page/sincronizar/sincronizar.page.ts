import { Component, OnInit, NgZone, Renderer2, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DbService } from 'src/app/services/db.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sincronizar',
  templateUrl: './sincronizar.page.html',
  styleUrls: ['./sincronizar.page.scss'],
})
export class SincronizarPage implements OnInit, AfterViewInit {
  books: any[];
  Data: any[] = [];
  objectSelect: any = {};
  miseleccion: any = "";
  isprincial: boolean = true;

  defaultSelectedRadio = "radio_2";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  @ViewChild("panel0") panel0: ElementRef;
  @ViewChild("panel1") panel1: ElementRef;
  @ViewChild("panel2") panel2: ElementRef;
  @ViewChild("panel3") panel3: ElementRef;
  @ViewChild("panel4") panel4: ElementRef;

  @Input("value") value;
  @Input("segmento") segmento;
  @Input("familia") familia;
  @Input("tipo") tipo;

  radio_list: any = [];
  radio_list_tmp = [
    {
      id: '1',
      name: 'radio_list',
      value: 'product_Pelicula_agricola_solpada|Pelicula Agricola Solpada',
      text: 'Pelicula Agricola Solpada',
      disabled: false,
      checked: false,
      color: 'primary'
    }, {
      id: '2',
      name: 'radio_list',
      value: 'product_Pelicula_de_extrusion_plana_en_PE|Pelicula de extrusion plana en PE',
      text: 'Pelicula de extrusion plana en PE',
      disabled: false,
      checked: false,
      color: 'secondary'
    }, {
      id: '3',
      name: 'radio_list',
      value: 'product_peliculas_sopladas|Peliculas Sopladas',
      text: 'Peliculas Sopladas',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '4',
      name: 'radio_list',
      value: 'product_Pelicula_laminada|Pelicula Laminada',
      text: 'Pelicula Laminada',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '5',
      name: 'radio_list',
      value: 'product_Pelicula_de_extrusion_plana_en_PP|Pelicula de extrusion plana en PP',
      text: 'Pelicula de extrusion plana en PP',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '6',
      name: 'radio_list',
      value: 'product_Film_de_PP_biorientado|Film de PP biorientado',
      text: 'Film de PP biorientado',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '7',
      name: 'radio_list',
      value: 'product_Fibras_Raffia|Fibras Raffia',
      text: 'Fibras Raffia',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '8',
      name: 'radio_list',
      value: 'product_Fibras_telas_spun_bonded_y_no_tejidas|Fibras telas spun bonded y no tejidas',
      text: 'Fibras telas spun bonded y no tejidas',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '9',
      name: 'radio_list',
      value: 'product_Fibras|Fibras',
      text: 'Fibras',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '10',
      name: 'radio_list',
      value: 'product_Moldeo_por_soplado|Moldeo por soplado',
      text: 'Moldeo por soplado',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '11',
      name: 'radio_list',
      value: 'product_Moldeo_por_inyeccion|Moldeo por inyeccion',
      text: 'Moldeo por inyeccion',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '12',
      name: 'radio_list',
      value: 'product_Moldeo_por_compresion|Moldeo por compresion',
      text: 'Moldeo por compresion',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '13',
      name: 'radio_list',
      value: 'product_Compuestos|Compuestos',
      text: 'Compuestos',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '14',
      name: 'radio_list',
      value: 'product_Extrusion_de_tuberia|Extrusion de tuberia',
      text: 'Extrusion de tuberia',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '15',
      name: 'radio_list',
      value: 'product_Tuberia_de_irrigacion_por_goteo|Tuberia de irrigacion por goteo',
      text: 'Tuberia de irrigacion por goteo',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '16',
      name: 'radio_list',
      value: 'product_Extrusion_de_laminas_placas|Extrusion de laminas placas',
      text: 'Extrusion de laminas placas',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '17',
      name: 'radio_list',
      value: 'product_Cables|Cables',
      text: 'Cables',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '18',
      name: 'radio_list',
      value: 'product_Extrusion_de_perfiles|Extrusion de perfiles',
      text: 'Extrusion de perfiles',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '19',
      name: 'radio_list',
      value: 'product_Moldeo_rotomoldeo|Moldeo rotomoldeo',
      text: 'Moldeo rotomoldeo',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '20',
      name: 'radio_list',
      value: 'product_Espumados|Espumados',
      text: 'Espumados',
      disabled: false,
      checked: false,
      color: 'danger'
    }
  ];

  SegmentArray: any = [];
  FamilyArray: any = [];
  TypeArray: any = [];

  SegmentArrayFilter: any = [];
  FamilyArrayFilter: any = [];
  TypeArrayFilter: any = [];

  filtroArrayFilter: any = [];

  opcionDeFiltro: number = 0;


  constructor(public modalController: ModalController
    , private ngZone: NgZone
    , private renderer: Renderer2
    , public loadingCtrl: LoadingController
    , private usuarioService: UsuarioService
    , private translateService: TranslateService
    , private db: DbService) {
    this.opcionDeFiltro = 0;
    this.isprincial = true;
    console.log('paso por el contructor del sincronizar page');
  }
  ngAfterViewInit(): void {
    //this.getPosts();

  }

  getSegment() {
    this.usuarioService.GetSegment().subscribe(data => {
      console.log(data);

      let temporal: any = data; 
      for (let result of this.segmento) {
       temporal = temporal.filter(obj => obj._id !== result._id);
     }

      this.SegmentArray = temporal;
      this.SegmentArrayFilter = temporal;
    });
  }

  GetFamily() {
    this.usuarioService.GetFamily().subscribe(data => {
      console.log(data);

      let temporal: any = data; 
       for (let result of this.familia) {
        temporal = temporal.filter(obj => obj._id !== result._id);
      }

      this.FamilyArray = temporal;
      this.FamilyArrayFilter = temporal;
    });
  }

  GetType() {
    this.usuarioService.GetType().subscribe(data => {
      console.log('seleccionados ' + JSON.stringify(this.tipo));
      console.log('consulta' + data);
      let temporal: any = data; 
       for (let result of this.tipo) {
        temporal = temporal.filter(obj => obj._id !== result._id);
      }
      this.TypeArray = temporal;
      this.TypeArrayFilter = temporal;
    });
  }

  getFiltroCampos() {
    //eliminamos los que ya estan seleccionados 
    for (let result of this.value) {
      this.radio_list_tmp = this.radio_list_tmp.filter(obj => obj.text !== result.texto);
    }
    this.radio_list = this.radio_list_tmp;
  }


  filtro(opcion: number) {
    this.isprincial = false;
    this.renderer.removeClass(this.panel0.nativeElement, "active");
    this.renderer.addClass(this.panel0.nativeElement, "inactive");

    if (opcion == 1) {
      this.opcionDeFiltro = 1;
      this.renderer.removeClass(this.panel1.nativeElement, "inactive");
      this.renderer.addClass(this.panel1.nativeElement, "active");
      this.getSegment();
    }
    if (opcion == 2) {
      this.opcionDeFiltro = 2;
      this.renderer.removeClass(this.panel2.nativeElement, "inactive");
      this.renderer.addClass(this.panel2.nativeElement, "active");
      this.GetFamily();
    }
    if (opcion == 3) {
      this.opcionDeFiltro = 3;
      this.renderer.removeClass(this.panel3.nativeElement, "inactive");
      this.renderer.addClass(this.panel3.nativeElement, "active");
      this.GetType();
    }
    if (opcion == 4) {
      this.opcionDeFiltro = 4;
      this.renderer.removeClass(this.panel4.nativeElement, "inactive");
      this.renderer.addClass(this.panel4.nativeElement, "active");
      this.getFiltroCampos();
    }
  }

  getItems(ev: any) {
    console.log(ev);
    var val = ev.target.value;
    console.log(val);
    if (val != "" && val.length > 3) {
      console.log("Paso por getItems");

      if (this.opcionDeFiltro == 1) {
        this.SegmentArray = this.SegmentArrayFilter.filter(x => {
          let buscar = val.toUpperCase();
          return x.segment_name.toUpperCase().includes(buscar);
        });
      }
      if (this.opcionDeFiltro == 2) {
        this.FamilyArray = this.FamilyArrayFilter.filter(x => {
          let buscar = val.toUpperCase();
          return x.family_name.toUpperCase().includes(buscar);
        });
      }
      if (this.opcionDeFiltro == 3) {
        this.TypeArray = this.TypeArrayFilter.filter(x => {
          let buscar = val.toUpperCase();
          return x.category_name.toUpperCase().includes(buscar);
        });
      }
      if (this.opcionDeFiltro == 4) {
        this.getFiltroCampos();
      }

    }

    if (val.length == 0) {
      //borro todo tengo que restituir el valor original 
      if (this.opcionDeFiltro == 1) {
        this.getSegment();
      }
      if (this.opcionDeFiltro == 2) {
        this.GetFamily();
      }
      if (this.opcionDeFiltro == 3) {
        this.GetType();
      }
      if (this.opcionDeFiltro == 4) {
        this.getFiltroCampos();
      }
    }
  }

  onClear($event) {
    console.log("Paso onClear");

  }

  onCancel($event) {
    console.log("Paso por onCancel");

  }

  buscartraduccio(id) {
    this.traduccionMensajes(id, (retorno) => {
      return retorno;
    })
  }

  traduccionMensajes(variable: string, callback) {
    this.translateService.get(variable).subscribe((res: string) => {
      callback(res);
    });
  }

  agregarFiltro() {

    let data = {};


    if (this.opcionDeFiltro == 1) {
      let temporal = this.SegmentArray.filter(obj => obj.checked == true);
      console.log(JSON.stringify(temporal));
      data = { operacion: 1, estado: true, seleccion: temporal };
    }
    if (this.opcionDeFiltro == 2) {
      let temporal = this.FamilyArray.filter(obj => obj.checked == true);
      console.log(JSON.stringify(temporal));
      data = { operacion: 2, estado: true, seleccion: temporal };
    }
    if (this.opcionDeFiltro == 3) {
      let temporal = this.TypeArray.filter(obj => obj.checked == true);
      console.log(JSON.stringify(temporal));
      data = { operacion: 3, estado: true, seleccion: temporal };
    }
    if (this.opcionDeFiltro == 4) {
      let temporal = this.radio_list.filter(obj => obj.checked == true);
      console.log(JSON.stringify(temporal));
      data = { operacion: 4, estado: true, seleccion: temporal };

    }
    this.modalController.dismiss(data);
  }

  cancelarFiltro() {
    let data = { estado: false };
    this.modalController.dismiss(data);
  }

  paso1() {
    this.renderer.removeClass(this.panel2.nativeElement, "active");
    this.renderer.addClass(this.panel2.nativeElement, "inactive");
    this.renderer.removeClass(this.panel1.nativeElement, "inactive");
    this.renderer.addClass(this.panel1.nativeElement, "active");
  }
  paso2() {
    this.renderer.removeClass(this.panel1.nativeElement, "active");
    this.renderer.addClass(this.panel1.nativeElement, "inactive");
    this.renderer.removeClass(this.panel2.nativeElement, "inactive");
    this.renderer.addClass(this.panel2.nativeElement, "active");
  }
  /*
    radioGroupChange(event) {
      console.log(event);
      console.log("radioGroupChange", event.detail);
      this.selectedRadioGroup = event.detail;
      this.objectSelect = this.selectedRadioGroup.value.split("|")[1];
  
    }
  
    radioFocus() {
      console.log("radioFocus");
  
    }
    radioSelect(event) {
      console.log("radioSelect", event.detail);
      this.selectedRadioItem = event.detail;
  
    }
    radioBlur() {
      console.log("radioBlur");
  
      console.log(JSON.stringify(this.radio_list));
    }*/

  ngOnInit() {
    console.log(this.value);

   


  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalController.dismiss(data);
  }


  deleteSong(data) {

  }
  /*getPosts() {

    var loader: any;
    loader = this.loadingCtrl.create({
      message: "looking for product",
      duration: 5000
    }).then((res2) => {
      res2.present();

      console.log('llego a la seleccion');
      this.usuarioService.GetProductAllImage().subscribe(data => {
        console.log('informacion ' + JSON.stringify(data));
        let contenido: any = data;
        this.books = contenido;
        res2.dismiss(); //sierro el dialogo
      });

      res2.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }
*/

}
