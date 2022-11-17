import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Credentials } from 'src/app/entities/credentials';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UserDetails } from 'src/app/entities/userdetails';
import { Message } from 'src/app/entities/message';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private authenticationService: AuthenticationService) {
  }

  login(creds: {email: string, password: string}) {
    console.log("email: " + creds.email);
    console.log("password: " + creds.password);
    this.authenticationService.loadUserDetails(creds);
    if(this.authenticationService.getUserDetail().token === undefined ){
      console.log("usuario undefined, no se cargó el usuario desde servidor. Ver en mensajes la razón")
      alert(this.authenticationService.getMessage(). message);
    }
    else {
    console.log("Si se cargo el usuario:")
    console.log(JSON.stringify(this.authenticationService.getUserDetail()));
    //guardar token y cargar página de inicio.
    }
  }
  
}

