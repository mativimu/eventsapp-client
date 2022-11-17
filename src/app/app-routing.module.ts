import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'myevents',
    loadChildren: () => import('./pages/myevents/myevents/myevents.module').then( m => m.MyeventsPageModule)
  },
  {
    path: 'subscribedevents',
    loadChildren: () => import('./pages/subscribedevents/subscribedevents/subscribedevents.module').then( m => m.SubscribedeventsPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'eventcreator',
    loadChildren: () => import('./pages/eventcreator/eventcreator/eventcreator.module').then( m => m.EventcreatorPageModule)
  },
  {
    path: 'guestlist',
    loadChildren: () => import('./pages/guestlist/guestlist/guestlist.module').then( m => m.GuestlistPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
