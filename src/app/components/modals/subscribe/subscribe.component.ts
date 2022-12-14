import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Message } from 'src/app/entities/message';
import { ParticipantService } from 'src/app/services/participant/participant.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {

  private userId: any;
  private eventId: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private alertController: AlertController,
    private modalController: ModalController,
    private participantService: ParticipantService
  ) { }

  ngOnInit() {
    console.log('userId: ' + this.userId);
    console.log('eventId: ' + this.eventId);
  }

  public subscribeUser() {
    this.storageService.get('user')
      .then( userDetails => {
        this.participantService.addParticipant(Number.parseInt(this.eventId), Number.parseInt(this.userId), userDetails.token)
          .subscribe(
            response => {
              let message = response as Message;
              console.log(message.message)
              this.userId = 0;
              this.eventId = 0;
              this.generateSuccessAlert('Usuario registrado');
            },
            err => {
              this.generateSuccessAlert(err.error.message);
            }
          );
        }
      )
      .catch( err => {
          this.generateErrorAlert(err.error.message);
      }
    );
  }
        
  public async generateErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  public async generateSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Done!',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
    alert.onDidDismiss().then(() => {
      this.modalController.dismiss();
      window.location.reload();
    });
  }
}
