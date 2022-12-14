import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { EventService } from 'src/app/services/event/event.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-eventinfo',
  templateUrl: './eventinfo.component.html',
  styleUrls: ['./eventinfo.component.scss'],
})
export class EventinfoComponent implements OnInit {

  public QRCode = '';
  public event: any;
  public id!: number;
  
  constructor(
    private router: Router,
    private eventService: EventService,
    private storageService: StorageService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getEvent();
  }

  public getEvent() {
    this.storageService.get('user').then(userDetails => {
      this.eventService.getEvent(this.id ,userDetails.token)
        .subscribe(
          response => {
            console.log(response);
            this.event = response;
            this.event.eventDate = format(parseISO(response.eventDate),'MMM d, yyyy HH:mm:ss')
            console.log(this.event);
            this.QRCode = response.eventId + ' ' + response.eventCode + ' ' + response.eventDate;
            console.log('QRCode: ' + this.QRCode)
          },
          err => {
            console.log (err.error.message);
          }
        )
    })
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

  public navToParticipants() {
    this.modalController.dismiss();
    this.router.navigateByUrl('participants/event/' + this.event.eventId);
  }

  public navToUsers() {
    this.modalController.dismiss();
    this.router.navigateByUrl('users/event/' + this.event.eventId);
  }
}
