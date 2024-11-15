import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' 
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) 
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'profesor',
    loadChildren: () => import('./pages/profesor/profesor.module').then(m => m.ProfesorPageModule),
    canActivate: [AuthGuard],  
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule) 
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'qrscan',
    loadChildren: () => import('./pages/qrscan/qrscan.module').then( m => m.QrscanPageModule),
    canActivate: [AuthGuard],  
  },
  {
    path: 'generateqr',
    loadChildren: () => import('./pages/generateqr/generateqr.module').then( m => m.GenerateqrPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'lista-alumnos',
    loadChildren: () => import('./pages/lista-alumnos/lista-alumnos.module').then( m => m.ListaAlumnosPageModule)
  },
  {
    path: '**', 
    redirectTo: 'error404', 
  },
  {
    path: 'error404',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
