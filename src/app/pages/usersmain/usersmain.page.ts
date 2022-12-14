import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { SubscribeComponent } from 'src/app/components/modals/subscribe/subscribe.component';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-usersmain',
  templateUrl: './usersmain.page.html',
  styleUrls: ['./usersmain.page.scss'],
})
export class UsersmainPage implements OnInit {

  public eventId: any;
  public users: any = [];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private modalController: ModalController,
    private userService: UserService,
  ) { 
  }

  ngOnInit() {
    this.getUsers();
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  getUsers() {
    this.storageService.get('user').then(userDetails => {
      this.userService.getUsers(userDetails.token)
        .subscribe(
          response => {
            console.log(response);
            this.users = response as any;
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

  public async showSubscribeModal(userId: any) {
    const modal = await this.modalController.create({
      component: SubscribeComponent,
      cssClass: 'subscribe',
      backdropDismiss: true,
      componentProps: {
        userId: userId,
        eventId: this.eventId
      }
    });
    modal.present();
  }
  
  public async generateErrorAlert(message: string) {
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
