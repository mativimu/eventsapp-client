import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventinfo',
  templateUrl: './eventinfo.component.html',
  styleUrls: ['./eventinfo.component.scss'],
})
export class EventinfoComponent implements OnInit {

  public QRCode = 'Event ';
  public id = 10;
  public code = 'PGY4121';
  public name = 'Programación de Apps Móviles';
  public type = 'Lesson';
  public date = '2022-11-08 19:00:00';
  public fingerprint = 'ed929b70c2279b68e661cd55284231ca0a62405485f4bb57ce611062d194b3fa';
  
  constructor() {
   }

  ngOnInit() {
    this.QRCode += this.date + this.code + this.id;
  }

}
