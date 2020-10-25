import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-innovationdetalle',
  templateUrl: './innovationdetalle.page.html',
  styleUrls: ['./innovationdetalle.page.scss'],
})
export class InnovationdetallePage implements OnInit {

  @Input() data: any;
  @Input() language: any;

  procesando = false;

  constructor(
    private modalController: ModalController
    , private translateService: TranslateService
    //, private storage: Storage
    ) {

  /*  this.storage.get('Language').then((val) => {
      console.log('idioma tomando variable en InnovationdetallePage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/

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
