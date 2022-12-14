import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'eventcreator',
    loadChildren: () => import('./pages/eventcreator/eventcreator.module').then( m => m.EventcreatorPageModule),
  },
  {
    path: 'myevents',
    loadChildren: () => import('./pages/myevents/myevents.module').then( m => m.MyeventsPageModule),
  },
  {
    path: 'subscribedevents',
    loadChildren: () => import('./pages/subscribedevents/subscribedevents.module').then( m => m.SubscribedeventsPageModule),
  },
  {
    path: 'users/event/:id',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/usersmain/usersmain.module').then( m => m.UsersmainPageModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'eventinfo',
    loadChildren: () => import('./components/modals/eventinfo/eventinfo.module').then( m => m.EventinfoComponentModule), 
  },
  {
    path: 'datetimepicker',
    loadChildren: () => import('./components/modals/datetimepicker/datetimepicker.module').then( m => m.DatetimepickerComponentModule)
  },
  {
    path: 'participants/event/:id',
    loadChildren: () => import('./pages/participants/participants.module').then( m => m.ParticipantsPageModule)
  },
  {
    path: 'unsubscribe',
    loadChildren: () => import('./components/modals/unsubscribe/unsubscribe.module').then( m => m.UnsubscribeComponentModule)
  },
  {
    path: 'subscribe',
    loadChildren: () => import('./components/modals/subscribe/subscribe.module').then( m => m.SubscribeComponentModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./components/modals/scanner/scanner.module').then( m => m.ScannerComponentModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
