import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersmainPageRoutingModule } from './usersmain-routing.module';

import { UsersmainPage } from './usersmain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersmainPageRoutingModule
  ],
  declarations: [UsersmainPage]
})
export class UsersmainPageModule {}
