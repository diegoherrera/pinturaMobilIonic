import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  profile: any = {
    user_mobile: ''
  };

  public slideOneForm: FormGroup;
  selectedLanguage: any;
  selectedType: any;
  LanguageArray: any = [];
  TypeArray: any = [];
  constructor(private storage: Storage, private formBuilder: FormBuilder, public Api: UsuarioService) {

    Api.getLanguage().subscribe(data=> {
      console.log(JSON.stringify(data));
      this.LanguageArray = data;
    });
    Api.getType().subscribe(data=> {
      console.log(JSON.stringify(data));
      this.TypeArray = data;
    });

    this.slideOneForm = formBuilder.group({
      user_first: [''],
      user_last: [''],
      user_email: [''],
      usuario: [''],
      password: [''],
      language: [''],
      type: ['']
    });

    storage.get('profile').then((val) => {
      console.log(val);
      this.profile = JSON.parse(val);

      this.selectedType = this.profile.user_IdTipo;
      this.selectedLanguage = this.profile.user_IdLanguage;

      this.slideOneForm = formBuilder.group({
        user_first: [this.profile.user_first],
        user_last: [this.profile.user_last],
        user_email: [this.profile.user_email],
        usuario: [this.profile.user_name],
        password: [this.profile.user_password],
        language: [this.profile.user_IdLanguage],
        type: [this.profile.user_IdTipo]
      });

    });
  }

  ngOnInit() {
  }

  updateProfile(form) {
    console.log(form.value);
  }

}
