import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscribedeventsPage } from './subscribedevents.page';

const routes: Routes = [
  {
    path: '',
    component: SubscribedeventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribedeventsPageRoutingModule {}
