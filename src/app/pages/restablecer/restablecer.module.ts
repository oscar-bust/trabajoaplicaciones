import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Incluye ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { RestablecerPageRoutingModule } from './restablecer-routing.module';
import { RestablecerPage } from './restablecer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Importa ReactiveFormsModule aquí
    IonicModule,
    RestablecerPageRoutingModule
  ],
  declarations: [RestablecerPage]
})
export class RestablecerPageModule {}
