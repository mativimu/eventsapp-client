import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ScannerComponent } from 'src/app/components/modals/scanner/scanner.component';
import { Message } from 'src/app/entities/message';
import { UserDetails } from 'src/app/entities/user';
import { ParticipantService } from 'src/app/services/participant/participant.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit{

  public QRCode: string = '';
  public user: UserDetails = {} as UserDetails;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StorageService,
    private modalController: ModalController,
    private alertController: AlertController,
    private participantService: ParticipantService
  ) { }
  
  async ngOnInit() {
    await this.loadUser();
    this.QRCode = this.user.id + ' ' + this.user.email;
    console.log(`QR String: ${this.QRCode}`);
    if(this.user.email !== this.activatedRoute.snapshot.paramMap.get('mail')){
      window.location.reload();
    }
  }

  public scanAttendance() {
  }

  public updateAttendance(eventId: number) {
    this.participantService.updateAttendance(eventId, this.user.id, this.user.token)
      .subscribe(
        response => {
          let message = response as Message;
          this.generateSuccessAlert('Asistencia confirmada')
        },
        err => {
          this.generateErrorAlert(err.error.message);
        }
      )
    ;
  }

  public logout() {
    this.storeService.clear();
    this.router.navigateByUrl('home');  
  }

  public async loadUser() {
    await this.storeService.get('user')
      .then((UserDetails) => {
        this.user = UserDetails;
        console.log(this.user);
      })
  }

  public async showScannerModal() {
    const modal = await this.modalController.create({
      component: ScannerComponent,
      cssClass: 'scanner',
      componentProps: {
        userId: this.user.id
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

  public async generateSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Done!',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  
  public navToMainPage() {
    this.router.navigateByUrl('main/' + this.user.email);
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
