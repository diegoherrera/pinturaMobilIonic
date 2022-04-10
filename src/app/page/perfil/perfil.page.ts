import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit, AfterViewInit {

  @ViewChild("panel0") panel0: ElementRef;
  @ViewChild("panel1") panel1: ElementRef;
  @ViewChild("panel2") panel2: ElementRef;
  
  @ViewChild('testForm') testFormElement;
  clickedImage: string = '';
  fotonueva: boolean = false;

  base64ImageCrudo: string = '';
  identificador: string;
  profile: any = {
    user_mobile: ''
  };
  opcion1 = false;
  opcion2 = false;
  opcion3 = false;
  opcion4 = false;
  opcion5 = false;
  //opcion6 = false;

  validandoanycheckbox: boolean = false;


  public slideOneForm: FormGroup;
  selectedLanguage: any;
  selectedType: any;
  LanguageArray: any = [];
  TypeArray: any = [];

  validarOpcion(valor: string, campo: string) {

    if (campo == undefined) {
      return false;
    }
    return campo.includes(valor);
  }

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
  }

  constructor(
    private storage: Storage,
    private formBuilder: FormBuilder,
    public Api: UsuarioService, 
    private renderer: Renderer2,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    private translateService: TranslateService) {

    /*this.storage.get('Language').then((val) => {
      //console.log('idioma tomando variable en PerfilPage ******************** ' + val);
      this.translateService.setDefaultLang(val); // add this
    });*/

    Api.getLanguage().subscribe(data => {
      //console.log(JSON.stringify(data));
      this.LanguageArray = data;
    });
    Api.getType().subscribe(data => {
      //console.log(JSON.stringify(data));
      this.TypeArray = data;
    });

    this.slideOneForm = formBuilder.group({
      user_first: [''],
      user_last: [''],
      user_email: [''],
      usuario: [''],
      password: [''],
      language: [''],
      idioma: [''],
      opcion1: [false],
      opcion2: [false],
      opcion3: [false],
      opcion4: [false],
      opcion5: [false],
      type: ['']
    });

    

   
  }
  ngAfterViewInit(): void {
    

    this.storage.get('profile').then((val) => {

      //console.log('llego por aqui ' + JSON.stringify(val));

      this.identificador = JSON.parse(val)._id;
      this.Api.GetUserProfile(JSON.parse(val)._id).subscribe(data => {
        
        this.profile = data;
        
        let idioma ='pg';
        if (this.profile.user_IdLanguage == '5f0a242149eb5338212b2554') idioma ='es';

        this.selectedType = this.profile.user_IdTipo;
        this.selectedLanguage = this.profile.user_IdLanguage;
        this.slideOneForm = this.formBuilder.group({
          user_first: [this.profile.user_first, Validators.required],
          user_last: [this.profile.user_last, Validators.required],
          user_email: [this.profile.user_email, Validators.required],
          usuario: [this.profile.user_name, Validators.required],
          password: [this.profile.user_password, Validators.required],
          language: [this.profile.user_IdLanguage],
          idioma: [idioma],
          opcion1: [this.validarOpcion('MX', this.profile.user_comercializacion)],
          opcion2: [this.validarOpcion('CA', this.profile.user_comercializacion)],
          opcion3: [this.validarOpcion('PA', this.profile.user_comercializacion)],
          opcion4: [this.validarOpcion('AR', this.profile.user_comercializacion)],
          opcion5: [this.validarOpcion('BZ', this.profile.user_comercializacion)],
         // opcion6: [this.validarOpcion('MTZ', this.profile.user_comercializacion)],
          type: [this.profile.user_IdTipo]
        });


      });




    });

  }

  ngOnInit() {
  }

  guardarperfil() {

  }

  public handleError = (controlName: string, errorName: string) => {
    return this.slideOneForm.controls[controlName].hasError(errorName);
  }

  validarCheckbox() {
    let retorno: any = false;
    if (this.slideOneForm.controls["opcion1"].value) retorno = true;
    if (this.slideOneForm.controls["opcion2"].value) retorno = true;
    if (this.slideOneForm.controls["opcion3"].value) retorno = true;
    if (this.slideOneForm.controls["opcion4"].value) retorno = true;
    if (this.slideOneForm.controls["opcion5"].value) retorno = true;

    return retorno;
  }

  traduccionMensajes(variable: string, callback) {
    this.translateService.get(variable).subscribe((res: string) => {
      callback(res);
    });
  }

  getZoneComercializacion() {

    var zona: string = "";
    if (this.slideOneForm.value.opcion1) {
      if (zona != "") zona = zona + "|";
      zona = zona + "MX";
    }
    if (this.slideOneForm.value.opcion2) {
      if (zona != "") zona = zona + "|";
      zona = zona + "CA";
    }
    if (this.slideOneForm.value.opcion3) {
      if (zona != "") zona = zona + "|";
      zona = zona + "PA";
    }
    if (this.slideOneForm.value.opcion4) {
      if (zona != "") zona = zona + "|";
      zona = zona + "AR";
    }
    if (this.slideOneForm.value.opcion5) {
      if (zona != "") zona = zona + "|";
      zona = zona + "BZ";
    }

   /* if (this.slideOneForm.value.opcion6) {
      if (zona != "") zona = zona + "|";
      zona = zona + "MTZ";
    }*/

    return zona;
  }

  submitForm() {
    //console.log('evento que dispara el formulario');
    if (this.slideOneForm.valid && this.validarCheckbox()) {
      //console.log('validooooo');

      var loader: any;
      this.traduccionMensajes("lblbuscandoproductos", (traduccion) => {
        loader = this.loadingCtrl.create({
          message: "Actualizando Perfil",
          duration: 5000
        }).then((res2) => {
          res2.present();
          //console.log('llego a la seleccion');
          let languageidioma = '5f0a242149eb5338212b2554';
          if (this.slideOneForm.controls["idioma"].value=='pg') languageidioma = '5f0a242949eb5338212b2556';

          this.Api.SendDataProfile(
            this.identificador,
            this.slideOneForm.controls["usuario"].value,
            this.slideOneForm.controls["password"].value,
            this.slideOneForm.controls["user_first"].value,
            this.slideOneForm.controls["user_last"].value,
            languageidioma,
            this.getZoneComercializacion(),
            this.base64ImageCrudo ).subscribe(data => {
            //console.log('informacion ' + JSON.stringify(data));
            //this.ProductArray = data.products;
            res2.dismiss(); //sierro el dialogo
          });
          res2.onDidDismiss().then((dis) => {
            //console.log('Loading dismissed! after 2 Seconds', dis);
          });
        });
      });


    }
  }

  captureImageGaleria() {

   let optionsgaleria: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(optionsgaleria).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.fotonueva = true;
      this.base64ImageCrudo = imageData;
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
    }, (err) => {
      //console.log(err);
      // Handle error
    });


  }

  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.fotonueva = true;
      this.base64ImageCrudo = imageData;
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
    }, (err) => {
      //console.log(err);
      // Handle error
    });
  }

  updateProfile(form) {
    //console.log(form.value);
  }

  ejecutarFormulario() {
    //console.log('xxxxxxxxxx');
    this.submitForm();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);

    this.renderer.removeClass(this.panel0.nativeElement, "active");
    this.renderer.removeClass(this.panel1.nativeElement, "active");
    this.renderer.removeClass(this.panel2.nativeElement, "active");
    this.renderer.addClass(this.panel0.nativeElement, "inactive");
    this.renderer.addClass(this.panel1.nativeElement, "inactive");
    this.renderer.addClass(this.panel2.nativeElement, "inactive");


    if (ev.detail.value == 'Informacion') {
      console.log('a');
      this.renderer.removeClass(this.panel0.nativeElement, "inactive");
      this.renderer.addClass(this.panel0.nativeElement, "active");
    }
    if (ev.detail.value == 'Idioma') {
      console.log('b');
      this.renderer.removeClass(this.panel1.nativeElement, "inactive");
      this.renderer.addClass(this.panel1.nativeElement, "active");
    }
    if (ev.detail.value == 'Comercializacion') {
      console.log('c');
      this.renderer.removeClass(this.panel2.nativeElement, "inactive");
      this.renderer.addClass(this.panel2.nativeElement, "active");
    }

  }

}
