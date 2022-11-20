import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Message } from 'src/app/entities/message'
import { Credentials } from 'src/app/entities/credentials';
import { UserDetails } from 'src/app/entities/userdetails';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authenticationService: AuthenticationService,
    private storageService: StorageService){ }

  public login(creds: Credentials) {
    this.authenticationService.authenticate(creds).subscribe(
      response => {
        console.log(JSON.stringify(response));
        this.storageService.set("user", response as UserDetails);
        this.router.navigateByUrl("registration");
      }, 
      error => {
        this.generateAlert()
      }
    );
  }

  public async generateAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Datos incorrectos! verifique e inténtelo nuevamente.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  
}

