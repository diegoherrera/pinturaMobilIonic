import { Component, OnInit, NgZone, Renderer2, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DbService } from 'src/app/services/db.service';

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

  defaultSelectedRadio = "radio_2";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  @ViewChild("panel1") panel1: ElementRef;
  @ViewChild("panel2") panel2: ElementRef;
  @Input("value") value;
  radio_list: any = [];
  radio_list_tmp = [
    {
      id: '1',
      name: 'radio_list',
      value: 'product_field_FilmBlownAGRO|Film Blown AGRO',
      text: 'Film Blown AGRO',
      disabled: false,
      checked: false,
      color: 'primary'
    }, {
      id: '2',
      name: 'radio_list',
      value: 'product_field_CastFilmPE|Cast Film PE',
      text: 'Cast Film PE',
      disabled: false,
      checked: true,
      color: 'secondary'
    }, {
      id: '3',
      name: 'radio_list',
      value: 'product_field_FilmBlownOther|Film Blown Other',
      text: 'Film Blown Other',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '4',
      name: 'radio_list',
      value: 'product_field_CastFilmPEOTHER|Cast Film PE OTHER',
      text: 'Cast Film PE OTHER',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '5',
      name: 'radio_list',
      value: 'product_field_FilmCoatingLamination|Film-Coating/Lamination',
      text: 'Film-Coating/Lamination',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '6',
      name: 'radio_list',
      value: 'product_field_FilmCastFilmPP|Film-Cast Film PP',
      text: 'Film-Cast Film PP',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '7',
      name: 'radio_list',
      value: 'product_field_BOPPOrientedFilms|BOPP-Oriented Films',
      text: 'BOPP-Oriented Films',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '8',
      name: 'radio_list',
      value: 'product_field_FibersRaffia|Fibers-Raffia',
      text: 'Fibers-Raffia',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '9',
      name: 'radio_list',
      value: 'product_field_FibersSpunBondedNonWoven|Fibers-Spun Bonded & Non Woven',
      text: 'Fibers-Spun Bonded & Non Woven',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '10',
      name: 'radio_list',
      value: 'product_field_Fibers|Fibers',
      text: 'Fibers',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '11',
      name: 'radio_list',
      value: 'product_field_BlowMolding|Blow Molding',
      text: 'Blow Molding',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '12',
      name: 'radio_list',
      value: 'product_field_MoldingInjectionMolding|Molding-Injection Molding',
      text: 'Molding-Injection Molding',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '13',
      name: 'radio_list',
      value: 'product_field_MoldingCompression|Molding-Compression',
      text: 'Molding-Compression',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '14',
      name: 'radio_list',
      value: 'product_field_Compounding|Compounding',
      text: 'Compounding',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '15',
      name: 'radio_list',
      value: 'product_field_PipeExtrusion|Pipe Extrusion',
      text: 'Pipe Extrusion',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '16',
      name: 'radio_list',
      value: 'product_field_DripIrrigation|Drip Irrigation',
      text: 'Drip Irrigation',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '17',
      name: 'radio_list',
      value: 'product_field_ExtrusionSheet|Extrusion-Sheet',
      text: 'Extrusion-Sheet',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '18',
      name: 'radio_list',
      value: 'product_field_WireCable|Wire & Cable',
      text: 'Wire & Cable',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '19',
      name: 'radio_list',
      value: 'product_field_ProfilesExtrusion|Profiles Extrusion',
      text: 'Profiles Extrusion',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '20',
      name: 'radio_list',
      value: 'product_field_MoldingRotomolding|Molding-Rotomolding',
      text: 'Molding-Rotomolding',
      disabled: false,
      checked: false,
      color: 'danger'
    }, {
      id: '21',
      name: 'radio_list',
      value: 'product_field_Foams|Foams',
      text: 'Foams',
      disabled: false,
      checked: false,
      color: 'danger'
    },
  ];


  constructor(public modalController: ModalController
    , private ngZone: NgZone
    , private renderer: Renderer2
    , public loadingCtrl: LoadingController
    , private usuarioService: UsuarioService
    , private db: DbService) {


    console.log('paso por el contructor del sincronizar page');
  }
  ngAfterViewInit(): void {
    //this.getPosts();
    
  }

  agregarFiltro() {
    let data = { estado: true, texto: this.selectedRadioGroup.value.split("|")[1], campo: this.selectedRadioGroup.value.split("|")[0], valor: this.miseleccion };
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
  }

  ngOnInit() {
    console.log(this.value);

    for (let result of this.value) {
      this.radio_list_tmp = this.radio_list_tmp.filter(obj => obj.text !== result.texto);
    }
    this.radio_list = this.radio_list_tmp;
    

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
