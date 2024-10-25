import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('usuarioActual'); // Verifica si el usuario está autenticado

  // Usa route.routeConfig para acceder a la ruta configurada
  const path = route.routeConfig ? route.routeConfig.path : 'ruta desconocida';
  console.log('Verificando acceso a: usuario');

  console.log('Usuario autenticado:', isLoggedIn);

  if (!isLoggedIn) {
    console.log('Redirigiendo a la página de login');
    return false; // Evita que acceda a la ruta
  }

  console.log('Acceso permitido');
  return true; // Permite el acceso a la ruta
};
