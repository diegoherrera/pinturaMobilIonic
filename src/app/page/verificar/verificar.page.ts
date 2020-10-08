import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Storage } from '@ionic/storage';

declare var SMS: any;
declare var SMSReceive: any;

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.page.html',
  styleUrls: ['./verificar.page.scss'],
})
export class VerificarPage implements OnInit {

  OTP: string = '2345';
  isenabledBotton: any = false;
  miCodigo: any = '0000';
  loader: any;
  profile: any = {
    user_mobile: ''
  };
  respuesta: any;
  autentificarProvider: any;
  alertCtrl: any;

  constructor(
    private router: Router
    , private storage: Storage
    , public loadingCtrl: LoadingController
    , public autentificacionService: UsuarioService
  ) {

    console.log('contructor de verificar');
    storage.get('profile').then((val) => {
      this.profile = JSON.parse(val);
    });
    this.OTP = '';
    //pongo a escuchar los sms 
    //this.ExpectingSMS();
    //solicito verificacion de Numero por sm 
    this.solicitarVerificacion();
  }

  ExpectingSMS() {

    SMSReceive.startWatch(() => {
      console.log('Empezo ha esperar');

      document.addEventListener('onSMSArrive', (e: any) => {
        var sms = e.data;
        console.log({ mensaje_entrante: sms });
        console.log(sms.body);
        console.log(this.miCodigo);
        console.log(sms.body.includes(this.miCodigo));
        if (sms.body.includes(this.miCodigo)) {
          console.log("cumple condicion");
          //this.codigoInput = this.miCodigo;
          this.codigoVerificado();

        }
      });

    }, Error => {
      console.log('Fallo el inicio de la espera');
    });


  }

  codigoVerificado() {
    this.OTP = this.miCodigo;
    this.isenabledBotton = true;

    /*
    this.loader = this.loadingCtrl.create({
      content: "Obteniendo Informacion de la Cuenta",
      duration: 3000
    });
    this.loader.present();
    console.log("telefono " + this.miTelefono);
    this.autentificarProvider.obtenerInformacionTelefono({ Telefono: this.miTelefono }).then(data => {
      this.loader.dismiss();
      console.log(data);
      this.datos = data;
      console.log('paso 1');
      window.localStorage.setItem('isLogin', 'True');
      window.localStorage.setItem('usuario', JSON.stringify(this.datos.usuario));
      if (this.datos.info.comercio != null) {
        console.log("*********************************+condicion true");
        window.localStorage.setItem('isComercio', 'True');
        window.localStorage.setItem('comercio', JSON.stringify(this.datos.info.comercio));
      } else {
        console.log("*********************************condicion false");
        window.localStorage.setItem('isComercio', 'False');
      }
      console.log('paso 4');
      window.localStorage.setItem('sincronizar', 'False');
      this.navCtrl.setRoot(InfoperfilPage);
    }, error => {
      this.loader.dismiss();
      console.log(error);
    })*/

  }


  solicitarVerificacion() {
    //GENERACION DE CODIGO DE 4 DIGITOS
    this.miCodigo = this.makeid();
    //PONEMOS LOADER PARA VERIFICAR VALIDACION DE NUMERO
    this.loader = this.loadingCtrl.create({
      message: "Validating the phone number registered in the system",
      duration: 5000
    }).then((res) => {
      res.present();
      //LLAMAMOS AL  SERVICIO PARA VERIFICAR EL NUMERO INGRESADO
      console.log("NUMERO A VERIFICAR " + this.profile.user_mobile);

      this.autentificacionService
        .verificNumberPhone({ telefono: this.profile.user_mobile }).subscribe(
          data => {
            res.dismiss(); //sierro el dialogo
            console.log("LO QUE RETORNO LA VERIFICACION DEL NUMERO DE TELEFONO" + JSON.stringify(data));
            //ASIGNO EL RETORNO A RESPUESTA
            this.respuesta = data;
            console.log("this.respuesta.error " + this.respuesta.error);
            if (this.respuesta.error == 0) {
              this.loader = this.loadingCtrl.create({
                message: "Wait for the verification code that we send by SMS",
                duration: 5000
              }).then((res2) => {
                res2.present();
                console.log('ENVIO CODIGO ' + this.miCodigo);
                this.autentificacionService
                  .sendSMS({ telefono: this.profile.user_mobile, codigo: this.miCodigo })
                  .subscribe(data2 => {
                    console.log("lo que responde luego de enviar sms " + JSON.stringify(data));
                    //ASIGNO EL RETORNO A RESPUESTA
                    this.respuesta = data;


                    this.autentificacionService.verificarAcount(this.profile._id).subscribe(data => {
                      console.log(JSON.stringify(data));
                    });

                  });
                res2.onDidDismiss().then((dis) => {
                  console.log('Loading dismissed! after 2 Seconds', dis);
                  this.OTP = this.miCodigo;
                  this.isenabledBotton = true;


                });
              });

            } else {
              //si no es valido el numero 

              let alert = this.alertCtrl.create({
                title: 'App',
                subTitle: 'The registered phone number is not valid, contact the administrator.',
                buttons: [
                  {
                    text: 'Ok',
                    handler: data => {

                    }
                  }
                ]
              });
              alert.present();


            }
          }
        );

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });



    /*
        this.autentificacionService
          .verificNumberPhone({ telefono: this.profile.user_mobile })
          .subscribe(data => {
            //CERRAMOS EL LOADER
            this.loader.dismiss();
            //SALIMOS  POR CONSOLA
            console.log("LO QUE RETORNO LA VERIFICACION DEL NUMERO DE TELEFONO" + JSON.stringify(data));
            //ASIGNO EL RETORNO A RESPUESTA
            this.respuesta = data;
            //SI EL ERROR ES 0 EL TELEFONO ES VALIDO
            console.log("this.respuesta.error " + this.respuesta.error);
            if (this.respuesta.error == 0) {
              //LLAMO EL SERVICIO PARA ENVIAR SMS CON EL NUMERO INGRESADO
              this.autentificacionService.sendSMS({ telefono: this.miTelefono, codigo: this.miCodigo })
                .subscribe(data => {
                  //loader.dismiss();
                  console.log("lo que responde luego de enviar sms " + JSON.stringify(data));
                  //ASIGNO EL RETORNO A RESPUESTA
                  this.respuesta = data;
                  //SI LA OPERACION ES CORRECTA
                  if (this.respuesta.operacion) {
                    //LEVANTO LOADER ESPERANDO LA LLEGADA DEL SMS
                    this.loader = this.loadingCtrl.create({
                      message: "Wait for the verification code that we send by SMS",
                      duration: 3000
                    });
                    this.loader.present();
                  }
                }, error => {
                  this.loader.dismiss();
                  console.log(error);
                })
            } else {
              //SI EL TELEFONO NO ES VALIDO 
              //BAJO EL LOADER
              this.loader.dismiss();
              //GENERO CUADRO DE DIALOGO INDICANDO ERROR EN EL NUMEOR INGRESADO
              let alert = this.alertCtrl.create({
                title: 'App',
                subTitle: 'The registered phone number is not valid, contact the administrator.',
                buttons: [
                  {
                    text: 'Ok',
                    handler: data => {
    
                    }
                  }
                ]
              });
              alert.present();
            }
          }, error => {
            this.loader.dismiss();
            console.log(JSON.stringify(error));
          })*/
  }


  miTelefono(miTelefono: any) {
    throw new Error("Method not implemented.");
  }

  ngOnInit() {
  }

  makeid() {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  VerificarEvent() {
    console.log('paso por el evento de verificar');
    this.router.navigate(['/dashboard']);
  }

}
