import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserDetails } from 'src/app/entities/user';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit{

  public qrCodeString: string = '';
  public username :string = '';
  public email :string = '';
  public fullname :string = '';
  public occupation :string = '';
  public user: UserDetails = {} as UserDetails;

  constructor(
    private router: Router,
    private storeService: StorageService
  ) { }
  async ngOnInit() {
    await this.loadUser();
    this.qrCodeString = 'user' + ' ' + this.email;
    console.log(`QR String: ${this.qrCodeString}`);
    console.log(JSON.stringify(this.user));
  }

  public logout() {
    this.storeService.clear();
    this.router.navigateByUrl('home');  
  }

  public async loadUser() {
    await this.storeService.get('user')
      .then((user) => {
        this.user = user
        this.username = (user as UserDetails).username;
        this.email = (user as UserDetails).email;
        this.fullname = (user as UserDetails).fullname;
        this.occupation = (user as UserDetails).occupation;
      })
  }

}
