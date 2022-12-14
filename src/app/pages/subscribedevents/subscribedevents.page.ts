import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';
import { baseUrl } from 'src/app/services/helper';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-subscribedevents',
  templateUrl: './subscribedevents.page.html',
  styleUrls: ['./subscribedevents.page.scss'],
})
export class SubscribedeventsPage implements OnInit {

  public subscribedEvents: any;
  constructor(
    private router: Router,
    private eventService: EventService,
    private storageService: StorageService,
    private modalController: ModalController,
    private alertController: AlertController
    ) {}
    
  ngOnInit() {
    this.getSubscribedEvents();
  }
  
  public getSubscribedEvents() {
    this.storageService.get('user').then(userDetails => {
      console.log((`This is the URL to use: ${baseUrl}/api/v1/events/created/user/id/${userDetails.id}/${userDetails.token}`));
      this.eventService
        .getSubscribedEvents(userDetails.id, userDetails.token)
        .subscribe(
          response => {
            console.log('getSubscribedEvents():');
            console.log(response);
            this.subscribedEvents = response;
            console.log(this.subscribedEvents);
          },
          err => {
            this.generateAlert(err.error.message);
          }
        );
      console.log(this.subscribedEvents);
    })
    .catch(err => {
      this.generateAlert(err.error.message)
    });
  }

  public async generateAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  
  public navToMainPage() {
    this.router.navigateByUrl('main');
  }

  public navToEventCreatorPage() {
    this.router.navigateByUrl('eventcreator');
  }

  public navToSubscribedEventsPage() {
    this.router.navigateByUrl('subscribedevents');
  }

  public navToMyEventsPage() {
    this.router.navigateByUrl('myevents');
  }

  public navToUsersmainPage() {
    this.router.navigateByUrl('users');
  }
}

