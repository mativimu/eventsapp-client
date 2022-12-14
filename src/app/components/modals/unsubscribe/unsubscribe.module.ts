import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnsubscribeComponentRoutingModule } from './unsubscribe-routing.module';

import { UnsubscribeComponent } from './unsubscribe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnsubscribeComponentRoutingModule
  ],
  declarations: [UnsubscribeComponent]
})
export class UnsubscribeComponentModule {}
