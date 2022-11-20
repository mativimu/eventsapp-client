import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
            HttpClientModule,
            AppRoutingModule,
            ReactiveFormsModule,
            IonicModule.forRoot(),
            IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
