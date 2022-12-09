import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format } from 'date-fns'
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss'],
})
export class DatetimepickerComponent implements OnInit {

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  public pickDate(event: any) {
    console.log(event.detail.value);
    this.storageService.set('eventDate', event.detail.value)
  }

}
