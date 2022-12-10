import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router
  ) { }

  public navToEventCreator() {
    this.router.navigateByUrl('eventcreator');
  }

  public navToMyEvents() {
    this.router.navigateByUrl('myevents');
  }

}
