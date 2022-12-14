import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Message } from 'src/app/entities/message';
import { ParticipantService } from 'src/app/services/participant/participant.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {

  public QRCode!: any;
  
  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private storageService: StorageService,
    private participantService: ParticipantService,
  ) { }

  ngOnInit() {
  }

  public updateAttendance(value: any) {
    console.log(value);
    this.storageService.get('user').then(userDetails => {
      console.log('userDetails.id: ' + userDetails.id);
      this.participantService.updateAttendance(Number.parseInt(value.eventId), userDetails.id, userDetails.token)
        .subscribe(
          response => {
            let message = response as Message;
            console.log(message.message);
            this.generateSuccessAlert('Asistencia confirmada');
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
