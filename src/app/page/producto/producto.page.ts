import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  @Input() data: any;
  procesando = false;

  constructor(private modalController: ModalController) {
    this.procesando = false;
  }

  ngOnInit() {
    console.log(this.data);
  }

  pushPage(id) {
    this.procesando = true;
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalController.dismiss(data);
  }
}
