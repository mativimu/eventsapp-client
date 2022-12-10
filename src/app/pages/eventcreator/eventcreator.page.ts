import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { data } from 'cypress/types/jquery';
import { format, parseISO } from 'date-fns';
import { da } from 'date-fns/locale';
import { DatetimepickerComponent } from 'src/app/components/modals/datetimepicker/datetimepicker.component';
import { EventinfoComponent } from 'src/app/components/modals/eventinfo/eventinfo.component';
import { NewEvent } from 'src/app/entities/event';
import { UserDetails } from 'src/app/entities/user';
import { EventService } from 'src/app/services/event/event.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-eventcreator',
  templateUrl: './eventcreator.page.html',
  styleUrls: ['./eventcreator.page.scss'],
})
export class EventcreatorPage {

  public events : Event[]= [];
  public eventDate = '';
  public unformattedDate = '';
  public condition = true;

  constructor (
    private router: Router,
    private eventsService: EventService,
    private storageService: StorageService,
    private modalController: ModalController,
    private alertController: AlertController  ) { 
    this.eventDate = format(new Date(), 'yyyy-MM-dd') + 'T10:00:00.000Z';
    this.setPickedDate();
  }

  public async getMyEvents() {
    await this.storageService.get('user')
      .then(user => {
        const userDetails: UserDetails = user as UserDetails;
        this.eventsService.getEvents(userDetails.token)
          .forEach(event => {
            this.events.push(event as Event); 
          }
        );
      }
    )
  }

  public createEvent(value: any) {
    console.log(value);
    console.log('date used to create event: ' + this.eventDate)
    const event: NewEvent = {
      eventCode : value.eventCode,
      eventName : value.eventName,
      eventType : value.eventType,
      eventDate : this.eventDate
    };
    console.log(event);
    this.storageService.get('user')
      .then(user => {
        this.eventsService
          .postEvent(event, user.id, user.token)
          .subscribe(
            response => {
              this.generateAlert(response.message);
            },
            err => {
            this.generateAlert(err.error.message);
            }
          )
        }
      )
      .catch(err => {
        this.generateAlert(err.message);
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

  public async showPicker() {
    const modal = await this.modalController.create({
      component: DatetimepickerComponent,
      cssClass: 'datetimepicker',
      backdropDismiss: true,
      componentProps: {
        date: this.eventDate
      }
    });
    modal.onDidDismiss().then((modalData) => {
      console.log(modalData)
      this.eventDate = modalData.data as string;
      console.log('event date updated from the modal: ' + this.eventDate);
      this.setPickedDate();
    });
    modal.present();
  }

  public async setPickedDate() {
    this.unformattedDate = format(parseISO(this.eventDate),'MMM d, yyyy HH:mm:ss');
  }

  public navToMyEvents() {
    this.router.navigateByUrl('myevents');
  }

  public navToEventCreator() {
    this.router.navigateByUrl('eventcreator');
  }
}