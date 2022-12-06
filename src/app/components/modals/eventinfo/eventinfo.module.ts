import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventinfoComponentRoutingModule } from './eventinfo-routing.module';

import { EventinfoComponent } from './eventinfo.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EventinfoComponentRoutingModule
  ],
  declarations: [EventinfoComponent]
})
export class EventinfoComponentModule {}
