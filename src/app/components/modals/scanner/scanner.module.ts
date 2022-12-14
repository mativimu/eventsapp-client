import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerComponentRoutingModule } from './scanner-routing.module';

import { ScannerComponent } from './scanner.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerComponentRoutingModule
  ],
  declarations: [ScannerComponent]
})
export class ScannerComponentModule {}
