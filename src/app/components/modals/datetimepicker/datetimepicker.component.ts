import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss'],
})
export class DatetimepickerComponent implements OnInit {
  
  public date = '';

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(`date passed to modal: ${this.date}`);
  }

  public pickDate(event: any) {
    console.log('date picked: ' + event.detail.value);
    this.date = event.detail.value;
    console.log( 'modal date updated: ' + this.date);
    this.modalController.dismiss(this.date)
  }

}
