import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AutentificacionService } from 'src/app/autentificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {
  error: boolean = false;
  show: boolean = false;

  constructor(public usuarioService: UsuarioService
    , private storage: Storage
    , private router: Router
    , private autentificacionService: AutentificacionService
    , private translate: TranslateService) {

  }

  ngAfterViewInit(): void {
    /*
    this.autentificacionService.isAuthenticated((respuesta)=> {
      this.router.navigate(['/dashboard']);
    });*/

    this.autentificacionService.getProfile((retorno) => {
      //console.log('profile ' + retorno);
    });

  }

  ngOnInit() {
  }

  showpassword() {
    this.show = true;
  }

  hidepassword() {
   this.show = false;
  }

  login(form) {
    //console.log(form.value);
    this.error = false;

    if (form.valid) {
      this.usuarioService.loginUser(
        form.value.usuario, form.value.password
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            //console.log('Request has been made!');
            break;
          case HttpEventType.Response:
            //console.log('User successfully created!', event.body);
            //this.storage.set('islogin', true);
            //console.log(JSON.stringify(event.body.profile));
            this.autentificacionService.registrarLogin(event.body.profile, (retorno) => {
              //console.log('luego de registrar el profile ');
              if (event.body.profile.user_IdLanguage == '5f0a242149eb5338212b2554') {
                this.autentificacionService.registrarLanguage('es', (retorno)=> {
                  console.log('Luego de login el idioma es = es');

                  this.storage.get('profile').then((val) => {
                    //console.log('perfil ******************** ' + JSON.stringify(val));
                    this.autentificacionService.registrarisLogin();
                  });

                });
                
              } else {
                //console.log('llego aqui en login 2');
                console.log('Luego de login el idioma es = pg');
                // this.storage.set('Language', 'pg');
                this.autentificacionService.registrarLanguage('pg', (retorno)=> {
                  //console.log('llego aqui en login 2 idioma pg');

                  this.storage.get('profile').then((val) => {
                    //console.log('perfil ******************** ' + JSON.stringify(val));
                    this.autentificacionService.registrarisLogin();
                  });

                });
              }

              

            });
        }
      },
        error => {
          this.error = true;
        })
    }

  }
}