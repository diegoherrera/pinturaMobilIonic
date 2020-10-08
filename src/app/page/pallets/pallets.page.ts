import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DetallePage } from '../detalle/detalle.page';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pallets',
  templateUrl: './pallets.page.html',
  styleUrls: ['./pallets.page.scss'],
})
export class PalletsPage implements OnInit, AfterViewInit {
  PalletsArray: any =[];

  constructor(public modalController: ModalController, private usuarioService: UsuarioService ) { 
    this.getPallets();
  }
  ngAfterViewInit(): void {
    
  }

  getPallets() {
    this.usuarioService.GetPallets().subscribe(data => {
      let arreglo: any = [];
      arreglo = data;
      console.log(data);
      this.PalletsArray = arreglo.pallets;
    });
  }

  ngOnInit() {
    
  }

  async pushPage(objeto) {
    const modal = await this.modalController.create({
      component: DetallePage,
      cssClass: 'my-custom-class',
      componentProps: { 'data': objeto }
    });
    return await modal.present();
  }
}
