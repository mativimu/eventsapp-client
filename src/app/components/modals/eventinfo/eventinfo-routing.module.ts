import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventinfoComponent } from './eventinfo.component';

const routes: Routes = [
  {
    path: '',
    component: EventinfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventinfoComponentRoutingModule {}
