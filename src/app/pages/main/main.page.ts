import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private router: Router,
    private storeService: StorageService
  ) { }
  ngOnInit(): void {
    
  }

  public logout() {
    this.storeService.clear();
    this.router.navigateByUrl('home')
  }

}
