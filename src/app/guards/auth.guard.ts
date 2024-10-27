import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('usuarioActual'); 


  const path = route.routeConfig ? route.routeConfig.path : 'ruta desconocida';
  console.log('Verificando acceso a: usuario');

  console.log('Usuario autenticado:', isLoggedIn);

  if (!isLoggedIn) {
    console.log('Redirigiendo a la página de login');
    return false;
  }

  console.log('Acceso permitido');
  return true; 
};
