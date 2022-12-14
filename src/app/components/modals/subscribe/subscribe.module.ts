import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscribeComponentRoutingModule } from './subscribe-routing.module';

import { SubscribeComponent } from './subscribe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscribeComponentRoutingModule
  ],
  declarations: [SubscribeComponent]
})
export class SubscribeComponentModule {}
