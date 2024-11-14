import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateqrPageRoutingModule } from './generateqr-routing.module';

import { GenerateqrPage } from './generateqr.page';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateqrPageRoutingModule,
    QRCodeModule
  ],
  declarations: [GenerateqrPage]
})
export class GenerateqrPageModule {}
