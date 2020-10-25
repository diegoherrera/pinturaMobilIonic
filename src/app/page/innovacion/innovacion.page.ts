import { Component, OnInit, NgZone, Renderer2, AfterViewInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { InnovationdetallePage } from '../innovationdetalle/innovationdetalle.page';
import { ProductoPage } from '../producto/producto.page';

@Component({
  selector: 'app-innovacion',
  templateUrl: './innovacion.page.html',
  styleUrls: ['./innovacion.page.scss'],
})
export class InnovacionPage implements OnInit, AfterViewInit {
  page: number = 0;
  searchString: string = '';
  regForPage: number = 10;
  datos: any = [];
  language: any = 'pg';


  constructor(public modalController: ModalController
    , private ngZone: NgZone
    , private renderer: Renderer2
   // , private storage: Storage
    , public loadingCtrl: LoadingController
    , private translateService: TranslateService
    , private usuarioService: UsuarioService) {

    /*this.storage.get('Language').then((val) => {
      console.log('idioma tomando variable en InnovacionPage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/
  }

  ngAfterViewInit(): void {
    this.buscarInfo(this.page, '');
  }

  ngOnInit() {
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
    console.log(ev);
    var val = ev.target.value;
    console.log(val);
    this.buscarInfo(this.page, val);
  }

  buscarInfo(pagina: number, buscar: string) {


    //5f104255eba71db5d83b131a
    this.usuarioService.getProductByLikeInnovation(buscar).subscribe(data => {
      console.log(data);
      this.datos = data;
    });
  }

  onClear($event) {
    console.log("Paso onClear");
    this.page = 0;
    this.buscarInfo(this.page, 'sindatos');
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
