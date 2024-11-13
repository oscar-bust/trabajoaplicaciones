import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateqrPage } from './generateqr.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateqrPageRoutingModule {}
