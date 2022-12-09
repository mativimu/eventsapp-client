import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatetimepickerComponent } from './datetimepicker.component';

const routes: Routes = [
  {
    path: '',
    component: DatetimepickerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatetimepickerComponentRoutingModule {}
