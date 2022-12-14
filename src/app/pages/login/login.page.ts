import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Credentials } from 'src/app/entities/credentials';
import { UserDetails } from 'src/app/entities/user';
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
    console.log(`email: ${creds.email}`);
    this.authenticationService.authenticate(creds).subscribe(
      response => {
        console.log(`user: ${JSON.stringify(response)}`);
        this.storageService.set("user", response as UserDetails);
        this.router.navigateByUrl("main/" + creds.email);
      }, 
      err => {
        if(err.error.message == 'User not found'){
          this.generateAlert('Usuario no registrado.')
        }
        else if (err.error.message === 'Invalid Password'){
          this.generateAlert('Contraseña inválida.')
        }
        else {
          this.generateAlert(err.error.message)
        }
      }
    );
  }

  public async generateAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  
}

