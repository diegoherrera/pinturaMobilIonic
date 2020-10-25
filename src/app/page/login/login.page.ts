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
    
    this.autentificacionService.getProfile((retorno)=> {
      console.log('profile ' + retorno);
    });
   
  }

  ngOnInit() {
  }

  login(form) {
    console.log(form.value);
    this.error = false;

    if (form.valid) {
      this.usuarioService.loginUser(
        form.value.usuario, form.value.password
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            //this.storage.set('islogin', true);
            console.log(JSON.stringify(event.body.profile));
            this.autentificacionService.registrarLogin(event.body.profile);
            //console.log('autenticated ' + this.autentificacionService.isAuthenticated());
            //this.storage.set('profile', JSON.stringify(event.body.profile));
            if (event.body.profile.user_IdLanguage == '5f0a242149eb5338212b2554') {
              //console.log('idioma es');
              //this.storage.set('Language', 'es');
              /* this.storage.get('Language').then((val) => {
                console.log('idioma tomando variable' + val);
                this.translate.use('es'); // add this

              });
              this.error = false;*/
              this.autentificacionService.registrarLanguage('es');
              this.router.navigate(['/verificar']);
            } else {
              console.log('idioma pg');
              // this.storage.set('Language', 'pg');
              this.autentificacionService.registrarLanguage('pg');
            }




        }
      },
        error => {
          this.error = true;
        })
    }

  }
}