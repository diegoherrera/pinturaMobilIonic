import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error: boolean = false;
  constructor(public usuarioService: UsuarioService, private storage: Storage, private router: Router) { }

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
            this.usuarioService.GetTraduction(event.body.profile.user_IdLanguage).subscribe(data => {
              this.storage.set('profile', JSON.stringify(event.body.profile));
              this.storage.set('traduction', JSON.stringify(data));
              this.error = false;
              this.router.navigate(['/verificar']);
            });
            
         
        }
      },
        error => {
          this.error = true;
        })
    }

  }
}