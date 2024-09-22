import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AloginPageRoutingModule } from './alogin-routing.module';
import { AloginPage } from './alogin.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AloginPageRoutingModule
  ],
  declarations: [AloginPage]
})
export class AloginPageModule {}
