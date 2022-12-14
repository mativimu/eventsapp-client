import { formatDate } from '@angular/common';
import { Component, OnInit, LOCALE_ID, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { EventinfoComponent } from 'src/app/components/modals/eventinfo/eventinfo.component';
import { EventService } from 'src/app/services/event/event.service';
import { baseUrl } from 'src/app/services/helper';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.page.html',
  styleUrls: ['./myevents.page.scss'],
})
export class MyeventsPage implements OnInit {

  public myEvents: any[] = [];
  private currentEmail = '';

  constructor(
    private router: Router,
    private eventService: EventService,
    private storageService: StorageService,
    private modalController: ModalController,
    private alertController: AlertController,
    ) { }
    
  ngOnInit() {
    this.getMyEvents();
    this.loadCurrentEmail();
  }

  public getMyEvents() {
    this.storageService.get('user').then(userDetails => {
      console.log((`This is the URL to use: ${baseUrl}/api/v1/events/created/user/id/${userDetails.id}/${userDetails.token}`));
      this.eventService
        .getMyEvents(userDetails.id, userDetails.token)
        .subscribe(
          response => {
            console.log('getMyEvents():')
            console.log(response);
            this.myEvents = response as any[];
            console.log(this.myEvents);
            this.myEvents.forEach(event => {
              event.eventDate = format(parseISO(event.eventDate),'MMM d, yyyy HH:mm:ss')
              console.log(event.eventDate);
            });
          },
          err => {
            this.generateErrorAlert(err.error.message);
          }
        );
      }
    )
    .catch(
      err => {
        this.generateErrorAlert(err.error.message)
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

  public async showEventInfoModal(id: number) {
    const modal = await this.modalController.create({
      component: EventinfoComponent,
      cssClass: 'eventinfo',
      componentProps: {
        id: id
      }
    });
    modal.present();
  }
  
  public loadCurrentEmail() {
    this.storageService.get('user').then(
      userDetails => {
        this.currentEmail = userDetails.email
      }
    );
  }
  
  public navToMainPage() {
    this.router.navigateByUrl('main/' + this.currentEmail);
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
