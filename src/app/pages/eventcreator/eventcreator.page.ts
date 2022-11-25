import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventinfoModalComponent } from 'src/app/components/modals/eventinfo-modal/eventinfo-modal.component';
import { User, UserDetails } from 'src/app/entities/user';
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
    private modalController: ModalController
  ) { }

  public async getMyEvents() {
    await this.storageService.get('user')
      .then(user => {
        const userDetails: UserDetails = user as UserDetails;
        this.eventsService.getevents(userDetails.token)
          .forEach(event => {
            this.events.push(event as Event);
          }
        );
      }
    )
  }

  public async showModal() {
    const modal = await this.modalController.create({
      component: EventinfoModalComponent,
      cssClass: 'eventinfo-modal'
    });
    await modal.present();
  }
}
