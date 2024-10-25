import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; // Asegúrate de que la ruta sea correcta


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' // Redirige a la página de inicio si la ruta está vacía
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) // Carga el módulo de la página de inicio
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    
  },
  {
    path: 'profesor',
    loadChildren: () => import('./pages/profesor/profesor.module').then(m => m.ProfesorPageModule),
    canActivate: [authGuard] 
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule) // Carga el módulo de la página de registro
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  
  {
    path: '**', // Captura cualquier ruta no definida
    redirectTo: 'error404', // Redirige a la página de inicio
  },
  {
    path: 'error404',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },



 

 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // Configuración de las rutas
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
