import { Component, OnInit, NgZone, Renderer2, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DbService } from 'src/app/services/db.service';
import { TranslateService } from '@ngx-translate/core';
import { NetworkService } from 'src/app/network.service';
import { DbcacheService } from 'src/app/dbcache.service';
import { AutentificacionService } from 'src/app/autentificacion.service';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.page.html',
  styleUrls: ['./preferencias.page.scss'],
})
export class PreferenciasPage implements OnInit, AfterViewInit {
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
  @ViewChild("panel5") panel5: ElementRef;

  value: any = [];
  segmento: any = [];
  familia: any = [];
  tipo: any = [];
  regulatory: any = [];


  @Input() language: any;

  radio_list: any = [];
  radio_list_tmp = [
    {
      id: '1',
      name: 'radio_list',
      value: 'product_Pelicula_agricola_solpada|Pelicula Agricola Solpada',
      text: 'Pelicula Agricola Solpada',
      es: 'Película agrícola soplada',
      pg: 'Filme Balão AGRO',
      disabled: false,
      checked: false,
      color: 'primary'
    }, {
      id: '2',
      name: 'radio_list',
      value: 'product_Pelicula_de_extrusion_plana_en_PE|Pelicula de extrusion plana en PE',
      text: 'Pelicula de extrusion plana en PE',
      es: 'Película de extrusión plana en PE',
      pg: 'Filme Plano/Cast PE',
      disabled: false,
      checked: false,
      color: 'secondary'
    }, {
      id: '3',
      name: 'radio_list',
      value: 'product_peliculas_sopladas|Peliculas Sopladas',
      text: 'Peliculas Sopladas',
      es: 'Películas sopladas',
      pg: 'Filme Balão Outros',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '4',
      name: 'radio_list',
      value: 'product_Pelicula_de_extrusion_plana_en_PE_otros|Pelicula de extrusion plana en PE otros',
      text: 'Pelicula de extrusion plana en PE otros',
      es: 'Película de extrusión plana en PE otros',
      pg: 'Filme Plano/Cast PE outros',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '5',
      name: 'radio_list',
      value: 'product_Pelicula_laminada|Pelicula Laminada',
      text: 'Pelicula Laminada',
      es: 'Película laminada',
      pg: 'Coating/Laminação',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '6',
      name: 'radio_list',
      value: 'product_Pelicula_de_extrusion_plana_en_PP|Pelicula de extrusion plana en PP',
      text: 'Pelicula de extrusion plana en PP',
      es: 'Película de extrusión plana en PP',
      pg: 'Filme Plano/Cast PP',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '7',
      name: 'radio_list',
      value: 'product_Film_de_PP_biorientado|Film de PP biorientado',
      text: 'Film de PP biorientado',
      es: 'Film de PP biorientado',
      pg: 'BOPP Filmes orientados',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '8',
      name: 'radio_list',
      value: 'product_Fibras_Raffia|Fibras Raffia',
      text: 'Fibras Raffia',
      es: 'Fibras Raffia',
      pg: 'Fibras/Rafia',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '9',
      name: 'radio_list',
      value: 'product_Fibras_telas_spun_bonded_y_no_tejidas|Fibras telas spun bonded y no tejidas',
      text: 'Fibras telas spun bonded y no tejidas',
      es: 'Fibras telas spun bonded y no tejidas',
      pg: 'Fibras Tecnidos não-tecidos',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '10',
      name: 'radio_list',
      value: 'product_Fibras|Fibras',
      text: 'Fibras',
      es: 'Fibras',
      pg: 'Fibras',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '11',
      name: 'radio_list',
      value: 'product_Moldeo_por_soplado|Moldeo por soplado',
      text: 'Moldeo por soplado',
      es: 'Moldeo por soplado',
      pg: 'Moldagem por sopro',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '12',
      name: 'radio_list',
      value: 'product_Moldeo_por_inyeccion|Moldeo por inyeccion',
      text: 'Moldeo por inyeccion',
      es: 'Moldeo por inyección',
      pg: 'Moldagem por injeção',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '13',
      name: 'radio_list',
      value: 'product_Moldeo_por_compresion|Moldeo por compresion',
      text: 'Moldeo por compresion',
      es: 'Moldeo por compresión',
      pg: 'Moldagem por Compressão',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '14',
      name: 'radio_list',
      value: 'product_Compuestos|Compuestos',
      text: 'Compuestos',
      es: 'Compuestos',
      pg: 'Compostos',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '15',
      name: 'radio_list',
      value: 'product_Extrusion_de_tuberia|Extrusion de tuberia',
      text: 'Extrusion de tuberia',
      es: 'Extrusión de tubería',
      pg: 'Extrusão de tubos',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '16',
      name: 'radio_list',
      value: 'product_Tuberia_de_irrigacion_por_goteo|Tuberia de irrigacion por goteo',
      text: 'Tuberia de irrigacion por goteo',
      es: 'Tubería de irrigación por goteo',
      pg: 'Tubos Irrigação e gotejamento',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '17',
      name: 'radio_list',
      value: 'product_Extrusion_de_laminas_placas|Extrusion de laminas placas',
      text: 'Extrusion de laminas placas',
      es: 'Extrusión de láminas placas',
      pg: 'Extrusão de Chapas',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '18',
      name: 'radio_list',
      value: 'product_Cables|Cables',
      text: 'Cables',
      es: 'Cables',
      pg: 'Fios & Cabos',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '19',
      name: 'radio_list',
      value: 'product_Extrusion_de_perfiles|Extrusion de perfiles',
      text: 'Extrusion de perfiles',
      es: 'Extrusión de perfiles',
      pg: 'Extrusão de Perfis',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '20',
      name: 'radio_list',
      value: 'product_Moldeo_rotomoldeo|Moldeo rotomoldeo',
      text: 'Moldeo rotomoldeo',
      es: 'Moldeo rotomoldeo',
      pg: 'Rotomoldagem',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '21',
      name: 'radio_list',
      value: 'product_Espumados|Espumados',
      text: 'Espumados',
      es: 'Espumados',
      pg: 'Espumas',
      disabled: false,
      checked: false,
      color: 'danger'
    }
  ];

  SegmentArray: any = [];
  FamilyArray: any = [];
  TypeArray: any = [];
  RegulatoryArray: any = [];

  SegmentArrayFilter: any = [];
  FamilyArrayFilter: any = [];
  TypeArrayFilter: any = [];
  RegulatoryArrayFilter: any = [];

  filtroArrayFilter: any = [];

  opcionDeFiltro: number = 0;


  sortOn(arr, prop) {
    console.log('llamo al metodo por propiedad ' + prop);
    return arr.sort(
      function (a, b) {
        if (a[prop] < b[prop]) {
          return -1;
        } else if (a[prop] > b[prop]) {
          return 1;
        } else {
          return 0;
        }
      }
    );
  }


  constructor(public modalController: ModalController
    , private ngZone: NgZone
    , private renderer: Renderer2
    , private router: Router
    , public loadingCtrl: LoadingController
    , private usuarioService: UsuarioService
    , private translateService: TranslateService
    , private networkService: NetworkService
    , private keyboard: Keyboard
    , private autentificacionService: AutentificacionService
    , private auth: AutentificacionService
    , private dbcacheService: DbcacheService
    , private db: DbService) {
    this.opcionDeFiltro = 0;
    this.isprincial = true;
    //console.log('paso por el contructor del sincronizar page');
  }
  ngAfterViewInit(): void {

    this.auth.getPreferencia((retorno) => {
      console.log('getPreferencia **************** ' + retorno);
      let data = JSON.parse(retorno);

      console.log('data.segmento', data.segmento);
      console.log('data.familia', data.familia);
      console.log('data.regulatory', data.regulatory);
      this.segmento = data.segmento;
      this.familia = data.familia;
      this.regulatory = data.regulatory;
    });

    this.auth.getLanguage((retorno) => {
      console.log('idiona **************** ' + retorno);
      this.translateService.use(retorno);
      this.language = retorno;
    });


    //this.getPosts();
    //console.log('idioma ******************* ' + this.language);


  }

  isHasConnection() {
    return true;
    // return this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ? false: true;
  }


  getSegment() {
    //console.log('getSegment');
    if (this.isHasConnection()) {
      this.usuarioService.GetSegment().subscribe(data => {
        console.log('segmento ', data);
        let temporal: any = data;
        for (let result of temporal) {
          console.log('reg ', result);
          for (let seleccionado of this.segmento) {
            if (result._id === seleccionado._id) {
              console.log('encontrado ', result._id);
              result.checked = true;
            }
            //temporal = temporal.filter(obj => obj._id === result._id).checked = true;
          }
        }

        this.SegmentArray = temporal;
        this.SegmentArrayFilter = temporal;
      });
    } else {
      /*
       this.dbcacheService.GetSegmentos((data) => {
         //console.log(data);
         let temporal: any = data;
         for (let result of this.segmento) {
           temporal = temporal.filter(obj => obj._id !== result._id);
         }
         this.SegmentArray = temporal;
         this.SegmentArrayFilter = temporal;
       });*/
    }
  }

  GetFamily() {
    if (this.isHasConnection()) {
      this.usuarioService.GetFamily().subscribe(data => {
        //console.log(data);
        let temporal: any = data;

        for (let result of temporal) {
          console.log('reg ', result);
          for (let seleccionado of this.familia) {
            if (result._id === seleccionado._id) {
              console.log('encontrado ', result._id);
              result.checked = true;
            }
            //temporal = temporal.filter(obj => obj._id === result._id).checked = true;
          }
        }

        this.FamilyArray = temporal;
        this.FamilyArrayFilter = temporal;
      });
    } else {
      /*
      this.dbcacheService.GetFamilias((data) => {
        //console.log(data);
        let temporal: any = data;
        for (let result of this.familia) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }
        this.FamilyArray = temporal;
        this.FamilyArrayFilter = temporal;
      });*/
    }
  }

  GetType() {
    if (this.isHasConnection()) {
      this.usuarioService.GetType().subscribe(data => {
        //console.log('seleccionados ' + JSON.stringify(this.tipo));
        console.log('consulta' + JSON.stringify(data));
        let temporal: any = data;
        for (let result of this.tipo) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }

        if (this.language == 'es') {
          temporal = this.sortOn(temporal, 'category_name');

        } else {
          temporal = this.sortOn(temporal, 'category_name_pg');
        }

        this.TypeArray = temporal;
        this.TypeArrayFilter = temporal;
      });
    } else {
      //modo offline
      //console.log('modo offline en GetType()');
      this.dbcacheService.GetCategorias((data) => {
        //console.log('seleccionados ' + JSON.stringify(this.tipo));
        //console.log('consulta' + data);
        let temporal: any = data;
        for (let result of this.tipo) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }
        this.TypeArray = temporal;
        this.TypeArrayFilter = temporal;
      });
    }
  }

  getFiltroCampos() {

    //console.log('languaje ' + );
    this.radio_list_tmp = this.sortOn(this.radio_list_tmp, this.language);
    //eliminamos los que ya estan seleccionados 
    for (let result of this.value) {
      console.log('ya seleccionado ' + JSON.stringify(result));
      console.log('comparo con  ' + JSON.stringify(result));
      this.radio_list_tmp = this.radio_list_tmp.filter(obj => obj.text !== result.text);

    }
    this.radio_list = this.radio_list_tmp;
    this.filtroArrayFilter = this.radio_list_tmp;
  }


  getRegulatory() {
    //console.log('getSegment');
    if (this.isHasConnection()) {
      this.usuarioService.GetRegulatory().subscribe(data => {
        //console.log(data);
        let temporal: any = data;
        for (let result of temporal) {
          console.log('reg ', result);
          for (let seleccionado of this.regulatory) {
            if (result._id === seleccionado._id) {
              console.log('encontrado ', result._id);
              result.checked = true;
            }
            //temporal = temporal.filter(obj => obj._id === result._id).checked = true;
          }
        }
        this.RegulatoryArray = temporal;
        this.RegulatoryArrayFilter = temporal;
      });
    } else {
      /*
      this.dbcacheService.GetSegmentos((data) => {
        //console.log(data);
        let temporal: any = data;
        for (let result of this.segmento) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }
        this.SegmentArray = temporal;
        this.SegmentArrayFilter = temporal;
      });*/
    }
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
    if (opcion == 5) {
      this.opcionDeFiltro = 5;
      this.renderer.removeClass(this.panel5.nativeElement, "inactive");
      this.renderer.addClass(this.panel5.nativeElement, "active");
      this.getRegulatory();
    }
  }


  filtrar_acentos(input) {
    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (var i = 0; i < acentos.length; i++) {
      input = input.replace(acentos.charAt(i), original.charAt(i)).toLowerCase();
    };
    return input;
  }

  limpiarFiltro() {
    let data = {
      segmento: [],
      familia: [],
      tipo: [],
      regulatory: []
    };

    this.familia = [];
    this.segmento = [];
    this.regulatory = [];



    var loader: any;
    this.traduccionMensajes("lblpreferenciaprocesando", (traduccion) => {
      loader = this.loadingCtrl.create({
        message: traduccion,
        duration: 1000
      }).then((res2) => {
        res2.present();
        this.autentificacionService.registrarPreferencia(data, (retorno) => {
          console.log('datos seleccionados ', JSON.stringify(data));
        });
        res2.onDidDismiss().then((dis) => {
          //console.log('Loading dismissed! after 2 Seconds', dis);
        });
      });
    });
  }

  eventCheck(item, opcion) {
    console.log('item ', item);
    

    if (opcion == 1) {
      if (item.checked) {
        //agrego al array 
        let bandera = this.segmento.filter(obj => obj._id === item._id);
        if (bandera.length == 0) {
          this.segmento.push(item);
        } 
        

        console.log('resultado ', this.segmento);
      } else {
        //si esta lo elimino 
        this.segmento = this.segmento.filter(obj => obj._id !== item._id);
        console.log('resultado ', this.segmento);
      }
    }

    if (opcion == 2) {
      if (item.checked) {
        //agrego al array 
        let bandera = this.familia.filter(obj => obj._id === item._id);
        if (bandera.length == 0) {
          this.familia.push(item);
        } 
        
        console.log('resultado ', this.familia);
      } else {
        //si esta lo elimino 
        this.familia = this.familia.filter(obj => obj._id !== item._id);
        console.log('resultado ', this.familia);
      }
    }

    if (opcion == 5) {
      if (item.checked) {
        //agrego al array 
        let bandera = this.regulatory.filter(obj => obj._id === item._id);
        if (bandera.length == 0) {
          this.regulatory.push(item);
        } 
        
        console.log('resultado ', this.regulatory);
      } else {
        //si esta lo elimino 
        this.regulatory = this.regulatory.filter(obj => obj._id !== item._id);
        console.log('resultado ', this.regulatory);
      }
    }
  }

  getItems(ev: any) {
    //console.log(ev);
    var val = ev.target.value;
    //console.log(val);
    if (val != "" && val.length > 1) {
      //console.log("Paso por getItems");

      console.log('opcion ', this.opcionDeFiltro);

      if (this.opcionDeFiltro == 1) {
        this.SegmentArray = this.SegmentArrayFilter.filter(x => {
          let buscar = val.toUpperCase();
          console.log('buscar ', buscar);
          console.log('segmento_name', this.filtrar_acentos(x.segment_name.toUpperCase()));
          return this.filtrar_acentos(x.segment_name.toUpperCase()).toUpperCase().includes(buscar) || this.filtrar_acentos(x.segment_name_pg.toUpperCase()).toUpperCase().includes(buscar);
        });
      }
      if (this.opcionDeFiltro == 2) {
        this.FamilyArray = this.FamilyArrayFilter.filter(x => {
          let buscar = val.toUpperCase();
          return this.filtrar_acentos(x.family_name).toUpperCase().includes(buscar) || this.filtrar_acentos(x.family_name_pg).toUpperCase().includes(buscar);
        });
      }
      if (this.opcionDeFiltro == 3) {
        this.TypeArray = this.TypeArrayFilter.filter(x => {
          let buscar = val.toUpperCase();
          return this.filtrar_acentos(x.category_name.toUpperCase()).includes(buscar) || this.filtrar_acentos(x.category_name_pg.toUpperCase()).includes(buscar);
        });
      }
      if (this.opcionDeFiltro == 4) {

        this.radio_list = this.filtroArrayFilter.filter(x => {
          let buscar = val.toUpperCase();
          console.log('this.filtrar_acentos(x.es).toUpperCase() ' + this.filtrar_acentos(x.es).toUpperCase());
          console.log('buscar ' + buscar);

          return this.filtrar_acentos(x.es).toUpperCase().includes(buscar) || this.filtrar_acentos(x.pg).toUpperCase().includes(buscar);
        });
        //this.getFiltroCampos();
      }

      if (this.opcionDeFiltro == 5) {
        console.log('llego');
        this.RegulatoryArray = this.RegulatoryArrayFilter.filter(x => {
          let buscar = val.toUpperCase();
          console.log('this.filtrar_acentos(x.es).toUpperCase() ' + this.filtrar_acentos(x.regulatory_name).toUpperCase());
          console.log('buscar ' + buscar);

          return this.filtrar_acentos(x.regulatory_name).toUpperCase().includes(buscar) || this.filtrar_acentos(x.regulatory_name_pg).toUpperCase().includes(buscar);
        });
        //this.getFiltroCampos();
      }


    }

    if (val.length == 0) {
      //borro todo tengo que restituir el valor original 
      this.clear();
    }
  }

  clear() {
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
    if (this.opcionDeFiltro == 5) {
      this.getRegulatory();
    }
  }

  onClear($event) {
    //console.log("Paso onClear");
    this.clear();

  }

  onCancel($event) {
    //console.log("Paso por onCancel");
    this.clear();
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

    let data = {
      segmento: [],
      familia: [],
      tipo: [],
      regulatory: []
    };


    //let temporalsegmento = this.SegmentArray.filter(obj => obj.checked == true);
    data.segmento = this.segmento;
    this.segmento = this.segmento;

    //let temporalfamilia = this.FamilyArray.filter(obj => obj.checked == true);
    data.familia = this.familia;
    this.familia = this.familia;
    /* if (this.opcionDeFiltro == 3) {
       let temporal = this.TypeArray.filter(obj => obj.checked == true);
       data.tipo = temporal;
 
     }
     if (this.opcionDeFiltro == 4) {
       let temporal = this.radio_list.filter(obj => obj.checked == true);
       data = { operacion: 4, estado: true, seleccion: temporal };
 
     }*/

    //let temporalregulatory = this.RegulatoryArray.filter(obj => obj.checked == true);
    data.regulatory = this.regulatory;
    this.regulatory = this.regulatory;

    console.log('datos seleccionados ', data);
    //this.modalController.dismiss(data);

    var loader: any;
    this.traduccionMensajes("lblpreferenciaprocesando", (traduccion) => {
      loader = this.loadingCtrl.create({
        message: traduccion,
        duration: 1000
      }).then((res2) => {
        res2.present();
        this.autentificacionService.registrarPreferencia(data, (retorno) => {
          console.log('datos seleccionados ', JSON.stringify(data));
        });
        res2.onDidDismiss().then((dis) => {
          //console.log('Loading dismissed! after 2 Seconds', dis);
        });
      });
    });

  }

  cancelarFiltro() {

    this.isprincial = true;
    this.renderer.removeClass(this.panel0.nativeElement, "inactive");
    this.renderer.addClass(this.panel0.nativeElement, "active");


    this.renderer.removeClass(this.panel1.nativeElement, "active");
    this.renderer.addClass(this.panel1.nativeElement, "inactive");

    this.renderer.removeClass(this.panel2.nativeElement, "active");
    this.renderer.addClass(this.panel2.nativeElement, "inactive");

    this.renderer.removeClass(this.panel3.nativeElement, "active");
    this.renderer.addClass(this.panel3.nativeElement, "inactive");

    this.renderer.removeClass(this.panel4.nativeElement, "active");
    this.renderer.addClass(this.panel4.nativeElement, "inactive");

    this.renderer.removeClass(this.panel5.nativeElement, "active");
    this.renderer.addClass(this.panel5.nativeElement, "inactive");
    //this.getSegment();
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
      //console.log(event);
      //console.log("radioGroupChange", event.detail);
      this.selectedRadioGroup = event.detail;
      this.objectSelect = this.selectedRadioGroup.value.split("|")[1];
  
    }
  
    radioFocus() {
      //console.log("radioFocus");
  
    }
    radioSelect(event) {
      //console.log("radioSelect", event.detail);
      this.selectedRadioItem = event.detail;
  
    }
    radioBlur() {
      //console.log("radioBlur");
  
      //console.log(JSON.stringify(this.radio_list));
    }*/

  ngOnInit() {
    //console.log(this.value);




  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalController.dismiss(data);
  }


  principal() {
    this.router.navigate(['/dashboard/buscador']);
  }

  deleteSong(data) {

  }

  searchEnter($event) {
 
    console.log('apreto enter')
    this.keyboard.hide(); 
  }

  /*getPosts() {

    var loader: any;
    loader = this.loadingCtrl.create({
      message: "looking for product",
      duration: 5000
    }).then((res2) => {
      res2.present();

      //console.log('llego a la seleccion');
      this.usuarioService.GetProductAllImage().subscribe(data => {
        //console.log('informacion ' + JSON.stringify(data));
        let contenido: any = data;
        this.books = contenido;
        res2.dismiss(); //sierro el dialogo
      });

      res2.onDidDismiss().then((dis) => {
        //console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }
*/

}
