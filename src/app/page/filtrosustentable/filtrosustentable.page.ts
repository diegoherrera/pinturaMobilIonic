import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController, LoadingController, ViewDidEnter } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-filtrosustentable',
  templateUrl: './filtrosustentable.page.html',
  styleUrls: ['./filtrosustentable.page.scss'],
})
export class FiltrosustentablePage implements OnInit, AfterViewInit , ViewDidEnter {

  @Input("value") value;
  @ViewChild("panel0") panel0: ElementRef;
  @ViewChild("panel1") panel1: ElementRef;
  @ViewChild("panel2") panel2: ElementRef;
  @ViewChild("panel3") panel3: ElementRef;
  @ViewChild("panel4") panel4: ElementRef;

  @Input() language: any;

  ProductoArray: any = [];
  ProcesoArray: any = [];
  PolimeroArray: any = [];

  ProductoArrayFilter: any = [];
  ProcesoArrayFilter: any = [];
  PolimeroArrayFilter: any = [];
  
  opcionDeFiltro: number = 0;
  
  @Input("producto") producto;
  @Input("proceso") proceso;
  @Input("polimero") polimero;

  isprincial: boolean = true;

  constructor(public modalController: ModalController
    , private usuarioService: UsuarioService
    , private renderer: Renderer2) { }

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

    GetProducto() {    
      this.usuarioService.GetProducto().subscribe(data => {

        
        let temporal: any = data;
        for (let result of this.producto) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }
        
        console.log('prducto ', data);
        temporal = temporal.filter(obj => obj.productossustentables_name !== 'sin datos');


        this.ProductoArray = temporal;
        this.ProductoArrayFilter = temporal;
      });
  
    }

    GetProceso() {    
      this.usuarioService.GetProceso().subscribe(data => {
        let temporal: any = data;
        for (let result of this.proceso) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }

        console.log('proceso ', data);
        temporal = temporal.filter(obj => obj.procesosustentables_name !== 'sin datos');

        this.ProcesoArray = temporal;
        this.ProcesoArrayFilter = temporal;
      });
  
    }

    GetPolimero() {    
      this.usuarioService.GetPolimero().subscribe(data => {
        let temporal: any = data;
        for (let result of this.polimero) {
          temporal = temporal.filter(obj => obj._id !== result._id);
        }

        console.log('polimero ', data);
        temporal = temporal.filter(obj => obj.polimerosustentable_name !== 'sin datos');


        this.PolimeroArray = temporal;
        this.PolimeroArrayFilter = temporal;
      });
  
    }


    agregarFiltro() {

      let data = {};
  
      if (this.opcionDeFiltro == 1) {
        let temporal = this.ProductoArray.filter(obj => obj.checked == true);      
        data = { operacion: 1, estado: true, seleccion: temporal };
      }
      if (this.opcionDeFiltro == 2) {
        let temporal = this.ProcesoArray.filter(obj => obj.checked == true);      
        data = { operacion: 2, estado: true, seleccion: temporal };
      }
      if (this.opcionDeFiltro == 3) {
        let temporal = this.PolimeroArray.filter(obj => obj.checked == true);      
        data = { operacion: 3, estado: true, seleccion: temporal };
      }
      
      
     
      this.modalController.dismiss(data);
    }


    filtro(opcion: number) {
      this.isprincial = false;
      this.renderer.removeClass(this.panel0.nativeElement, "active");
      this.renderer.addClass(this.panel0.nativeElement, "inactive");
  
      if (opcion == 1) {
        this.opcionDeFiltro = 1;
        this.renderer.removeClass(this.panel1.nativeElement, "inactive");
        this.renderer.addClass(this.panel1.nativeElement, "active");
        this.GetProducto();
      }
      if (opcion == 2) {
        this.opcionDeFiltro = 2;
        this.renderer.removeClass(this.panel2.nativeElement, "inactive");
        this.renderer.addClass(this.panel2.nativeElement, "active");
        this.GetProceso();
      }
      if (opcion == 3) {
        this.opcionDeFiltro = 3;
        this.renderer.removeClass(this.panel3.nativeElement, "inactive");
        this.renderer.addClass(this.panel3.nativeElement, "active");
        this.GetPolimero();
      }  
      
  
    }
  
    cancelarFiltro() {
      let data = { estado: false };
      this.modalController.dismiss(data);
    }


}
