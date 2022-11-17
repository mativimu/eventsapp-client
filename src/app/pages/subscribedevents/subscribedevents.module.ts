import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscribedeventsPageRoutingModule } from './subscribedevents-routing.module';

import { SubscribedeventsPage } from './subscribedevents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscribedeventsPageRoutingModule
  ],
  declarations: [SubscribedeventsPage]
})
export class SubscribedeventsPageModule {}
