import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatetimepickerComponentRoutingModule } from './datetimepicker-routing.module';

import { DatetimepickerComponent } from './datetimepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatetimepickerComponentRoutingModule
  ],
  declarations: [DatetimepickerComponent]
})
export class DatetimepickerComponentModule {}
