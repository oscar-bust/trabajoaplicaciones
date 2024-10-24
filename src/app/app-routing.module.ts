import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) // Carga el módulo de la página de login
  },
  {
    path: 'profesor',
    loadChildren: () => import('./pages/profesor/profesor.module').then(m => m.ProfesorPageModule) // Carga el módulo de la página de profesor
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule) // Carga el módulo de la página de registro
  },
 
  {
    path: '**', // Captura cualquier ruta no definida
    redirectTo: 'home', // Redirige a la página de inicio
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // Configuración de las rutas
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
