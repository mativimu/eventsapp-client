import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Message } from 'src/app/entities/message';
import { ParticipantService } from 'src/app/services/participant/participant.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss'],
})
export class UnsubscribeComponent implements OnInit {

  private eventId: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private alertController: AlertController,
    private modalController: ModalController,
    private participantService: ParticipantService
  ) { }

  ngOnInit() {
    console.log('evenId injected: ' + this.eventId);
  }

  public unsubscribeParticipant() {
    this.storageService.get('user')
      .then( userDetails => {
        console.log('userDetails.id: ' + userDetails.id);
        this.participantService.deleteParticipant(Number.parseInt(userDetails.id) + Number.parseInt(this.eventId), userDetails.token)
          .subscribe(
            response => {
              let message = response as Message;
              this.eventId = 0;
              this.generateSuccessAlert(message.message);
            },
            err => {
              this.generateErrorAlert(err.error.message);
            }
          );
        }
      )
      .catch( err => {
          this.generateErrorAlert(err.error.message);
      }
    );
  }

  public updateAttendance() {
    this.storageService.get('user').then(userDetails => {
      console.log('userDetails.id: ' + userDetails.id);
      this.participantService.updateAttendance(this.eventId, userDetails.id, userDetails.token)
        .subscribe(
          response => {
            let message = response as Message;
            console.log(message.message);
            this.generateSuccessAlert('Asistencia confirmada');
            this.eventId = 0;
          },
          err => {
            this.generateErrorAlert(err.error.message);
          }
        );
      }
    )
    .catch(err => {
      this.generateErrorAlert(err.error.message);
    });
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
        
  public async generateErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
