import { Component, OnInit, NgZone, Renderer2, AfterViewInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProductoPage } from '../producto/producto.page';

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

  constructor(public modalController: ModalController
    , private ngZone: NgZone
    , private renderer: Renderer2
    , public loadingCtrl: LoadingController
    , private usuarioService: UsuarioService) { }


  ngAfterViewInit(): void {
    this.buscarInfo(this.page, '');
  }

  ngOnInit() {
  }


  getItems(ev: any) {
    console.log(ev);
    var val = ev.target.value;
    console.log(val);
    this.buscarInfo(this.page, val);
  }

  buscarInfo(pagina: number, buscar: string) {
    //5f104255eba71db5d83b131a
    if (buscar == '') {
      buscar = 'sindatos';
    }
    this.usuarioService.GetProducGroup("5f10424deba71db5d83b1318", buscar, pagina).subscribe(data => {
      console.log(data);
      this.datos = data;
    });
  }

  onClear($event) {
    console.log("Paso onClear");
    this.page = 0;
    this.buscarInfo(this.page, 'sindatos');
  }

  async pushPage(registro) {
    this.usuarioService.getProductById(registro.agrupacion_product_Id._id).subscribe(async data => {
      console.log('registro completo ' + JSON.stringify(data));
      //console.log(JSON.stringify(registro));
      const modal = await this.modalController.create({
        component: ProductoPage,
        cssClass: 'my-custom-class',
        componentProps: { 'data': data.products }
      });
      return await modal.present();
    });


  }

  onCancel($event) {
    console.log("Paso por onCancel");
    this.page = 0;
    this.buscarInfo(this.page, 'sindatos');
  }

  doInfinite(event) {
    this.page++;
    this.buscarInfo(this.page, this.searchString);
  }

}
