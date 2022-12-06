import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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

  private events : Event[]= [];

  constructor(
    private eventsService: EventService,
    private storageService: StorageService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

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

  public createEvent(event: NewEvent) {
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

  public async showModal() {
    const modal = await this.modalController.create({
      component: EventinfoComponent,
      cssClass: 'eventinfo'
    });
    await modal.present();
  }
}
