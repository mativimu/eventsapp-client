import { Component, OnInit } from '@angular/core';
import { ParticipantService } from 'src/app/services/participant/participant.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AlertController, ModalController } from '@ionic/angular';
import { UnsubscribeComponent } from 'src/app/components/modals/unsubscribe/unsubscribe.component';
import { Message } from 'src/app/entities/message';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {

  public id: any;
  public participants: any = [];

  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private modalController: ModalController,
    private participantService: ParticipantService,
  ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    console.log('id: ' + this.id);
    this.getParticipants();
  }

  getParticipants() {
    this.storageService.get('user').then(userDetails => {
      this.participantService.getParticipants(this.id, userDetails.token)
        .subscribe(
          response => {
            console.log(response);
            this.participants = response as any;
          },
          err => {
            this.generateErrorAlert(err.error.message);
          }
        )
      }
    )
    .catch(err => {
      this.generateErrorAlert(err.error.message);
    });
  }

  public async showUnsubscribeModal(participantId: any) {
    const modal = await this.modalController.create({
      component: UnsubscribeComponent,
      cssClass: 'unsubscribe',
      backdropDismiss: true,
      componentProps: {
        userId: participantId,
        eventId: this.id
      }
    });
    modal.present();
  }
    
  public async generateSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
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
