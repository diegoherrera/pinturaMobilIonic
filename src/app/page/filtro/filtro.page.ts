import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ModalController, LoadingController, ViewDidEnter } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.page.html',
  styleUrls: ['./filtro.page.scss'],
})
export class FiltroPage implements OnInit, AfterViewInit , ViewDidEnter {

  @Input("value") value;
  @ViewChild("panel0") panel0: ElementRef;
  @ViewChild("panel1") panel1: ElementRef;
  @ViewChild("panel2") panel2: ElementRef;
  @ViewChild("panel3") panel3: ElementRef;
  @ViewChild("panel4") panel4: ElementRef;
  @ViewChild("panel5") panel5: ElementRef;
  @ViewChild("panel6") panel6: ElementRef;

  @Input() language: any;


  radio_list: any = [];
  radio_list_tmp = [
    {
      id: 'opcion1',
      name: 'radio_list',
      value: 'product_Extrusion_de_peliculas_sopladas|Pelicula Agricola Solpada',
      text: 'product_Extrusion_de_peliculas_sopladas',
      es: 'Extrusión de películas sopladas (blown-film)',
      pg: 'Extrusão de filme balão (blown-film)',
      disabled: false,
      checked: false,
      color: 'primary'
    }, {
      id: 'opcion2',
      name: 'radio_list',
      value: 'product_Extrusion_plana_de_películas|Pelicula de extrusion plana en PE',
      text: 'product_Extrusion_plana_de_películas',
      es: 'Extrusión plana de películas (cast Film)',
      pg: 'Extrusão de filme plano (cast-film)',
      disabled: false,
      checked: false,
      color: 'secondary'
    }, {
      id: 'opcion3',
      name: 'radio_list',
      value: 'product_Coextrusión_y_Laminacion_de_peliculas_sopladas|Peliculas Sopladas',
      text: 'product_Coextrusión_y_Laminacion_de_peliculas_sopladas',
      es: 'Coextrusión y Laminación de películas sopladas (blown-film)',
      pg: 'Coextrusão e Laminação de filme balão (blown-film)',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion4',
      name: 'radio_list',
      value: 'product_soplado|Pelicula Laminada',
      text: 'product_soplado',
      es: 'Soplado',
      pg: 'Sopro',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion5',
      name: 'radio_list',
      value: 'product_Inyeccion_de_Piezas_o_Tapas|Pelicula de extrusion plana en PP',
      text: 'product_Inyeccion_de_Piezas_o_Tapas',
      es: 'Inyección de Piezas o Tapas',
      pg: 'Injeção de peças e tampas',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion6',
      name: 'radio_list',
      value: 'product_Extrusion_de_Perfiles_y_Placas_Termo_formadas|Film de PP biorientado',
      text: 'product_Extrusion_de_Perfiles_y_Placas_Termo_formadas',
      es: 'Extrusión de Perfiles y Placas Termo formadas',
      pg: 'Extrusão de perfis e chapas',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion7',
      name: 'radio_list',
      value: 'product_Extrusion_no_tejido_non_woven_Spunbond|Fibras Raffia',
      text: 'product_Extrusion_no_tejido_non_woven_Spunbond',
      es: 'Extrusión no-tejido (non-woven) Spunbond',
      pg: 'Extrusão não-tecido (non-woven) Spunbond',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion8',
      name: 'radio_list',
      value: 'product_Monofilamentos_de_PP|Fibras telas spun bonded y no tejidas',
      text: 'product_Monofilamentos_de_PP',
      es: 'Monofilamentos de PP',
      pg: 'Monofilamentos de PP',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion9',
      name: 'radio_list',
      value: 'prodcut_Multifilamentos_de_PP|Fibras',
      text: 'prodcut_Multifilamentos_de_PP',
      es: 'Multifilamentos de PP',
      pg: 'Multifilamentos de PP',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion10',
      name: 'radio_list',
      value: 'product_Extrusion_de_tuberias_alambre_y_cables|Moldeo por soplado',
      text: 'product_Extrusion_de_tuberias_alambre_y_cables',
      es: 'Extrusión de tuberias, alambre y cables',
      pg: 'Extrusão de Tubos, Fios e Cabos',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion11',
      name: 'radio_list',
      value: 'product_BOPP_multi_capas|Moldeo por inyeccion',
      text: 'product_BOPP_multi_capas',
      es: 'BOPP  (multi-capas)',
      pg: 'BOPP  (multi-camadas)',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion12',
      name: 'radio_list',
      value: 'product_Envases_Soplados_multi_capas|Moldeo por compresion',
      text: 'product_Envases_Soplados_multi_capas',
      es: 'Envases Soplados (multi-capas)',
      pg: 'Embalagens Soprados (multi-camadas)',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion13',
      name: 'radio_list',
      value: 'product_Extrusión_de_Perfiles_y_Placas_Termo_formadas_multi_capas|Compuestos',
      text: 'product_Extrusión_de_Perfiles_y_Placas_Termo_formadas_multi_capas',
      es: 'Extrusión de Perfiles y Placas Termo formadas (multi-capas)',
      pg: 'Extrusão de tubos para bisnagas, perfis e Chapas para Termoformagem (multi-capas)',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion14',
      name: 'radio_list',
      value: 'product_Extrusion_Pelicula_Plana_cast_Film_para_Rafias_y_Coating|Extrusion de tuberia',
      text: 'product_Extrusion_Pelicula_Plana_cast_Film_para_Rafias_y_Coating',
      es: 'Extrusión Película Plana (cast Film) para Rafias y Coating',
      pg: 'Extrusão Filme plano (cast Film) para Ráfias e Coating',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion15',
      name: 'radio_list',
      value: 'product_Extrusion_y_regranulacion_de_PCR_y_PIR|Tuberia de irrigacion por goteo',
      text: 'product_Extrusion_y_regranulacion_de_PCR_y_PIR',
      es: 'Extrusión y regranulación de PCR y PIR',
      pg: 'Extrusão e regranulação de PCR e reciclados',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: 'opcion16',
      name: 'radio_list',
      value: 'product_Extrusion_de_Monofilamentos_Multifilamentos|Tuberia de irrigacion por goteo',
      text: 'product_Extrusion_de_Monofilamentos_Multifilamentos',
      es: 'Extrusión de Monofilamentos y/o Multifilamentos',
      pg: 'Extrusão de Monofilamentos e Multifilamentos',
      disabled: false,
      checked: false,
      color: 'danger'
    }
  ];
  
  RegionArray: any = [];
  FamilyArray: any = [];
  TypeArray: any = [];

  RegionArrayFilter: any = [];
  FamilyArrayFilter: any = [];
  TypeArrayFilter: any = [];
  filtroArrayFilter: any = [];

  opcionDeFiltro: number = 0;

  dataRegionArray: any = [];
  dataFamilyArray: any = [];
  dataTypeArray: any = [];
  dataAplicacion : any = [];
  dataRegulatory : any = [];

  
  @Input("region") region;
  @Input("familia") familia;
  @Input("tipo") tipo;
  @Input("segmento") segmento;
  @Input("regulatory") regulatory;

  dataSegmentArray: any = [];
  //dataRegulatory: any = [];
  SegmentArray: any = [];
  RegulatoryArray: any = [];
  SegmentArrayFilter: any = [];
  RegulatoryArrayFilter: any = [];


  isprincial: boolean = true;

  constructor(
    public modalController: ModalController
    , private keyboard: Keyboard
    , private usuarioService: UsuarioService
    , private renderer: Renderer2
  ) { }

  ionViewDidEnter(): void {
    console.log('idiona **************** ' + this.language);
  }
  ngAfterViewInit(): void {
    console.log('idiona **************** ' + this.language);
  }

  ngOnInit() {
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalController.dismiss(data);
  }

  GetFamily() {    

    if (this.dataFamilyArray.length == 0) {
      this.usuarioService.GetFamily().subscribe(data => {
        //console.log(data);
        let temporal: any = data;
        for (let result of this.familia) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }
        this.FamilyArray = temporal;
        this.FamilyArrayFilter = temporal;
        this.dataFamilyArray = temporal;

        for (let result of this.FamilyArray) {
          result.checked = false;
        }

      });
    } else {
      let temporal: any = this.dataFamilyArray;
        for (let result of this.familia) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }
        this.FamilyArray = temporal;
        this.FamilyArrayFilter = temporal;

        for (let result of this.FamilyArray) {
          result.checked = false;
        }
    }

  }

getFiltroCampos() {
    //eliminamos los que ya estan seleccionados 
        

    this.radio_list_tmp = this.sortOn(this.radio_list_tmp, this.language);
    //eliminamos los que ya estan seleccionados 
    for (let result of this.value) {
      console.log('ya seleccionado ' + JSON.stringify(result));
      console.log('comparo con  ' + JSON.stringify(result));
      this.radio_list_tmp = this.radio_list_tmp.filter(obj => obj.text !== result.text);

    }
    for (let result of this.radio_list_tmp) {
      console.log('recorrido data ', result);
      result.checked = false;
    }

    this.radio_list = this.radio_list_tmp;
    this.filtroArrayFilter = this.radio_list_tmp;


    
  }

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

  restablecerFiltro() {
    this.tipo = [];
    this.value = [];
    this.region = [];
    this.familia = [];
    
  }

  GetType() {
    
    if (this.dataTypeArray.length == 0) {
        this.usuarioService.GetTypeinnovation().subscribe(data => {
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
          console.log('consulta' + JSON.stringify(temporal));
          this.TypeArray = temporal;
          this.TypeArrayFilter = temporal;
          this.dataTypeArray = temporal;

          for (let result of this.TypeArray) {
            result.checked = false;
          }

        });
      } else {
        let temporal: any = this.dataTypeArray;
          for (let result of this.tipo) {
            temporal = temporal.filter(obj => obj._id !== result._id);
          }  
          if (this.language == 'es') {
            temporal = this.sortOn(temporal, 'category_name');
  
          } else {
            temporal = this.sortOn(temporal, 'category_name_pg');
          }
          console.log('consulta' + JSON.stringify(temporal));
          this.TypeArray = temporal;
          this.TypeArrayFilter = temporal;

          for (let result of this.TypeArray) {
            result.checked = false;
          }
      }

  }


  getRegion() {
    if (this.dataRegionArray.length == 0) {
      this.usuarioService.getRegion().subscribe(data => {
      
        let temporal: any = data;
        for (let result of this.region) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }
        this.RegionArray = temporal;
        this.RegionArrayFilter = temporal;
        this.dataRegionArray = temporal;

        for (let result of this.RegionArray) {
          result.checked = false;
        }

        
      });
    } else  {
      let temporal: any = this.dataRegionArray;
          for (let result of this.region) {
            temporal = temporal.filter(obj => obj._id !== result._id);
          }
          this.RegionArray = temporal;
          this.RegionArrayFilter = temporal;

          for (let result of this.RegionArray) {
            result.checked = false;
          }
    }
    
    
  }

  

  getSegment() {
    //this.loadin1 = false;
    //console.log('getSegment');
    if (true) {

      if (this.dataSegmentArray.length == 0) {
        this.usuarioService.GetSegment().subscribe(data => {
          console.log(data);
          let temporal: any = data;
          for (let result of this.segmento) {
            temporal = temporal.filter(obj => obj._id !== result._id);
          }
          this.SegmentArray = temporal;
          this.SegmentArrayFilter = temporal;
          this.dataSegmentArray = temporal;

          for (let result of this.SegmentArray) {
            result.checked = false;
          }
        });
      } else {
        let temporal: any = this.dataSegmentArray;
          for (let result of this.segmento) {
            temporal = temporal.filter(obj => obj._id !== result._id);
          }
          this.SegmentArray = temporal;
          this.SegmentArrayFilter = temporal;

          for (let result of this.SegmentArray) {
            result.checked = false;
          }
      }

      /*this.usuarioService.GetFiltro(this.segmento, this.familia, this.tipo, this.regulatory, 3).subscribe(data => {
        //console.log(data);
        let temporal: any = data;
        for (let result of this.segmento) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }
        this.SegmentArray = temporal;
        this.SegmentArrayFilter = temporal;
        this.dataSegmentArray = temporal;

        for (let result of this.SegmentArray) {
          result.checked = false;
        }
        this.loadin1 = true;
      });*/


    } else {
      //modo offline
      //console.log('modo offline en getSegment()');
     /* this.dbcacheService.GetSegmentos((data) => {
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


  getRegulatory() {

    if (this.dataRegulatory.length == 0) {

      this.usuarioService.GetRegulatory().subscribe(data => {

        console.log('consulta' + JSON.stringify(data));
        let temporal: any = data;
        for (let result of this.regulatory) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }
        if (this.language == 'es') {
          temporal = this.sortOn(temporal, 'regulatory_name');

        } else {
          temporal = this.sortOn(temporal, 'regulatory_name_pg');
        }
        console.log('consulta' + JSON.stringify(temporal));

        this.RegulatoryArray = temporal;
        this.RegulatoryArrayFilter = temporal;
        this.dataRegulatory = temporal;

        for (let result of this.RegulatoryArray) {
          result.checked = false;
        }


      });

    } else {
      let temporal: any = this.dataRegulatory;
      for (let result of this.regulatory) {
        temporal = temporal.filter(obj => obj._id !== result._id);
      }
      if (this.language == 'es') {
        temporal = this.sortOn(temporal, 'regulatory_name');

      } else {
        temporal = this.sortOn(temporal, 'regulatory_name_pg');
      }
      console.log('consulta' + JSON.stringify(temporal));
      this.RegulatoryArray = temporal;
      this.RegulatoryArrayFilter = temporal;

      for (let result of this.RegulatoryArray) {
        result.checked = false;
      }
    }

    /*this.usuarioService.GetFiltro(this.segmento, this.familia, this.tipo, this.regulatory, 4).subscribe(data => {

      let temporal: any = data;
        for (let result of this.regulatory) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }
        if (this.language == 'es') {
          temporal = this.sortOn(temporal, 'regulatory_name');

        } else {
          temporal = this.sortOn(temporal, 'regulatory_name_pg');
        }
        console.log('consulta' + JSON.stringify(temporal));

        this.RegulatoryArray = temporal;
        this.RegulatoryArrayFilter = temporal;
        this.dataRegulatory = temporal;

        for (let result of this.RegulatoryArray) {
          result.checked = false;
        }

       this.loadin5 = true;
    });*/

  }



  agregarFiltro() {
   console.log('agregar filtro');
    let data = {};
/*
    if (this.opcionDeFiltro == 1) {
      let temporal = this.RegionArray.filter(obj => obj.checked == true);      
      data = { operacion: 1, estado: true, seleccion: temporal };
    }
    if (this.opcionDeFiltro == 2) {
      let temporal = this.FamilyArray.filter(obj => obj.checked == true);      
      data = { operacion: 2, estado: true, seleccion: temporal };
    }
    if (this.opcionDeFiltro == 3) {
      let temporal = this.TypeArray.filter(obj => obj.checked == true);      
      data = { operacion: 3, estado: true, seleccion: temporal };
    }
    
    if (this.opcionDeFiltro == 4) {
      let temporal = this.radio_list.filter(obj => obj.checked == true);
      console.log(JSON.stringify(temporal));
      data = { operacion: 4, estado: true, seleccion: temporal };

    }*/
   
    data = { operacion: 1, estado: true, tipo: this.tipo, familia: this.familia, filtro: this.value, region: this.region, segmento: this.segmento, regulatory: this.regulatory };
    
    this.modalController.dismiss(data);
  }


  RegresarAMenu() {
    console.log('regresarmenu');
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

    this.renderer.removeClass(this.panel6.nativeElement, "active");
    this.renderer.addClass(this.panel6.nativeElement, "inactive");

    /*this.renderer.removeClass(this.panel5.nativeElement, "active");
    this.renderer.addClass(this.panel5.nativeElement, "inactive");*/

    if (this.opcionDeFiltro == 1) {
      for (let result of this.RegionArray.filter(obj => obj.checked == true)) {
         let find = this.region.filter(obj => obj._id == result._id);
         if (find.length == 0) {
          this.region.push(result);
         }
      }
      //this.segmento = this.segmento.concat(this.SegmentArray.filter(obj => obj.checked == true));
    }

    if (this.opcionDeFiltro == 2) {

      for (let result of this.FamilyArray.filter(obj => obj.checked == true)) {
        let find = this.familia.filter(obj => obj._id == result._id);
        if (find.length == 0) {
         this.familia.push(result);
        }
     }


      //this.familia = this.familia.concat(this.FamilyArray.filter(obj => obj.checked == true));
    }

    
    if (this.opcionDeFiltro == 3) {
      //this.tipo = this.tipo.concat(this.TypeArray.filter(obj => obj.checked == true));

      for (let result of this.TypeArray.filter(obj => obj.checked == true)) {
        let find = this.tipo.filter(obj => obj._id == result._id);
        if (find.length == 0) {
         this.tipo.push(result);
        }
     }

    }

    
    if (this.opcionDeFiltro == 4) {
      //this.value = this.value.concat(this.radio_list.filter(obj => obj.checked == true));
      
      for (let result of this.radio_list.filter(obj => obj.checked == true)) {
         console.log('DATA ', result);
        let find = this.value.filter(obj => obj.id == result.id);
        if (find.length == 0) {
         this.value.push(result);
        }
     }

     console.log('value ', this.value);


    }

    if (this.opcionDeFiltro == 5) {
      for (let result of this.SegmentArray.filter(obj => obj.checked == true)) {
        let find = this.segmento.filter(obj => obj._id == result._id);
        if (find.length == 0) {
          this.segmento.push(result);
        }
      }
      //this.segmento = this.segmento.concat(this.SegmentArray.filter(obj => obj.checked == true));
    }

    if (this.opcionDeFiltro == 6) {
      //this.tipo = this.tipo.concat(this.TypeArray.filter(obj => obj.checked == true));

      for (let result of this.RegulatoryArray.filter(obj => obj.checked == true)) {
        let find = this.regulatory.filter(obj => obj._id == result._id);
        if (find.length == 0) {
          this.regulatory.push(result);
        }
      }

    }

/*
    
    if (this.opcionDeFiltro == 5) {
      //this.tipo = this.tipo.concat(this.TypeArray.filter(obj => obj.checked == true));

      for (let result of this.RegulatoryArray.filter(obj => obj.checked == true)) {
        let find = this.regulatory.filter(obj => obj._id == result._id);
        if (find.length == 0) {
         this.regulatory.push(result);
        }
     }

    }*/
    
 
    

    
    
  }



  removeFiltro(item: any) {
    this.value = this.value.filter(obj => obj !== item);
    //this.getProduct();
  }

  removeFiltroRegion(item: any) {
    this.region = this.region.filter(obj => obj !== item);
    //this.getProduct();
  }

  removeFiltrofamilia(item: any) {
    this.familia = this.familia.filter(obj => obj !== item);
    //this.getProduct();
  }

  removeFiltrocategoria(item: any) {
    this.tipo = this.tipo.filter(obj => obj !== item);
    //this.getProduct();
  }

  removeFiltroSegment(item: any) {
    this.segmento = this.segmento.filter(obj => obj !== item);
    //this.getProduct();
  }

  removeFiltroregulatory(item: any) {
    this.regulatory = this.regulatory.filter(obj => obj !== item);
    //this.getProduct();
  }


  filtrar_acentos(input) {
    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (var i = 0; i < acentos.length; i++) {
      input = input.replace(acentos.charAt(i), original.charAt(i)).toLowerCase();
    };
    return input;
  }

  getItems(ev: any) {
    //console.log(ev);
    var val = ev.target.value;
    //console.log(val);
    if (val != "" && val.length > 1) {
      //console.log("Paso por getItems");

      console.log('this.opcionDeFiltro ' + this.opcionDeFiltro);

      if (this.opcionDeFiltro == 1) {
        this.RegionArray = this.RegionArrayFilter.filter(x => {
          let buscar = this.filtrar_acentos(val).toUpperCase();
          return this.filtrar_acentos(x.region_name).toUpperCase().includes(buscar) || this.filtrar_acentos(x.region_name_pg).toUpperCase().includes(buscar);
        });
      }

      if (this.opcionDeFiltro == 2) {
        this.FamilyArray = this.FamilyArrayFilter.filter(x => {
          let buscar = this.filtrar_acentos(val).toUpperCase();
          return this.filtrar_acentos(x.family_name).toUpperCase().includes(buscar) || this.filtrar_acentos(x.family_name_pg).toUpperCase().includes(buscar);
        });
      }

      if (this.opcionDeFiltro == 3) {
        this.TypeArray = this.TypeArrayFilter.filter(x => {
          let buscar = this.filtrar_acentos(val).toUpperCase();
          return this.filtrar_acentos(x.category_name).toUpperCase().includes(buscar) || this.filtrar_acentos(x.category_name_pg).toUpperCase().includes(buscar);
        });
      }

      if (this.opcionDeFiltro == 4) {

        this.radio_list = this.filtroArrayFilter.filter(x => {
          let buscar = this.filtrar_acentos(val).toUpperCase();
          console.log('this.filtrar_acentos(x.es).toUpperCase() ' + this.filtrar_acentos(x.es).toUpperCase());
          console.log('buscar ' + buscar);

          return this.filtrar_acentos(x.es).toUpperCase().includes(buscar) || this.filtrar_acentos(x.pg).toUpperCase().includes(buscar);
        });
        //this.getFiltroCampos();
      }

      if (this.opcionDeFiltro == 5) {
        this.SegmentArray = this.SegmentArrayFilter.filter(x => {
          let buscar = this.filtrar_acentos(val).toUpperCase();
          return this.filtrar_acentos(x.segment_name).toUpperCase().includes(buscar) || this.filtrar_acentos(x.segment_name_pg).toUpperCase().includes(buscar);
        });
      }

      if (this.opcionDeFiltro == 6) {

        console.log('this.RegulatoryArrayFilter ', this.RegulatoryArrayFilter);
        this.RegulatoryArray = this.RegulatoryArrayFilter.filter(x => {
          let buscar = this.filtrar_acentos(val).toUpperCase();
          //console.log('this.filtrar_acentos(x.es).toUpperCase() ' + this.filtrar_acentos(x.es).toUpperCase());
          console.log('buscar ' + buscar);

          return this.filtrar_acentos(x.regulatory_name).toUpperCase().includes(buscar) || this.filtrar_acentos(x.regulatory_name_pg).toUpperCase().includes(buscar);
        });
        //this.getFiltroCampos();
      }

      


    }

    if (val.length == 0) {
      //borro todo tengo que restituir el valor original 
      if (this.opcionDeFiltro == 1) {
        this.getRegion();
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
        this.getSegment();
      }
      if (this.opcionDeFiltro == 6) {
        this.getRegulatory();
      }
      
    }
  }

  onClear($event) {
    //console.log("Paso onClear");

  }

  onCancel($event) {
    //console.log("Paso por onCancel");

  }



  filtro(opcion: number) {
    this.isprincial = false;
    this.renderer.removeClass(this.panel0.nativeElement, "active");
    this.renderer.addClass(this.panel0.nativeElement, "inactive");

    if (opcion == 1) {
      this.opcionDeFiltro = 1;
      this.renderer.removeClass(this.panel1.nativeElement, "inactive");
      this.renderer.addClass(this.panel1.nativeElement, "active");
      this.getRegion();
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
      this.getSegment();
    }

    if (opcion == 6) {
      this.opcionDeFiltro = 6;
      this.renderer.removeClass(this.panel6.nativeElement, "inactive");
      this.renderer.addClass(this.panel6.nativeElement, "active");
      this.getRegulatory();
    }


  }

  cancelarFiltro() {
    //let data = { estado: false };
    //this.modalController.dismiss(data);

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

    this.renderer.removeClass(this.panel6.nativeElement, "active");
    this.renderer.addClass(this.panel6.nativeElement, "inactive");

  }

  searchEnter($event) {
    console.log('paso por el evento enter');
    this.keyboard.hide(); 
  }


}
