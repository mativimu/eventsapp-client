import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NewUser } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user/user.service';
import { Message } from 'src/app/entities/message'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  public disabled: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private userService: UserService
  ) { }

  public registrate(user: NewUser) {
    console.log(JSON.stringify(user))
    this.userService.addUser(user).subscribe(
      response => {
        console.log(response as Message);
        this.generateAlert("Tu cuenta de Events ha sido creada.")
        this.router.navigateByUrl('login');
      },
      err => {
        this.generateAlert(err.error.message);
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

  navToEventCreatorPage(){
    console.log("navToEventcreatorPage()")
    this.router.navigateByUrl("eventcreator");
  }
}
