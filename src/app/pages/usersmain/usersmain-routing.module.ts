import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersmainPage } from './usersmain.page';

const routes: Routes = [
  {
    path: '',
    component: UsersmainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersmainPageRoutingModule {}
