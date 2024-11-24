// clases.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClasesPageRoutingModule } from './clases-routing.module';

import { ClasesPage } from './clases.page'; // Página que muestra las clases disponibles

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesPageRoutingModule, // Importa el módulo de rutas
  ],
  declarations: [ClasesPage], // Declara la página
})
export class ClasesModule {}
