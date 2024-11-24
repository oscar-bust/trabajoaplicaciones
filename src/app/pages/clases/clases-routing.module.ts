// clases-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasesPage } from './clases.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesPage, // Página principal que lista las clases
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Configuración de las rutas
  exports: [RouterModule],
})
export class ClasesPageRoutingModule {}
