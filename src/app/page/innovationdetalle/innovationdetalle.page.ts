import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-innovationdetalle',
  templateUrl: './innovationdetalle.page.html',
  styleUrls: ['./innovationdetalle.page.scss'],
})
export class InnovationdetallePage implements OnInit {

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
