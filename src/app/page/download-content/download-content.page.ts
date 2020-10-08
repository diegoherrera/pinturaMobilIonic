import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-download-content',
  templateUrl: './download-content.page.html',
  styleUrls: ['./download-content.page.scss'],
})
export class DownloadContentPage implements OnInit {
  showLoader: boolean = false;
  ProductArray: any = [];
  constructor(public modalController: ModalController
    , private ngZone: NgZone
    , private renderer: Renderer2
    , public loadingCtrl: LoadingController
    , private usuarioService: UsuarioService) { }

  ngOnInit() {
  }
  showProgressBar() {
    this.showLoader = true;
  }

  hideProgressBar() {
    this.showLoader = false;
  }

  getPosts() {

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
        this.ProductArray = contenido.products;
        res2.dismiss(); //sierro el dialogo
      });

      res2.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }

}
