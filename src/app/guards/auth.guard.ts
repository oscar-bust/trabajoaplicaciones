import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  // Esta función se llama cuando alguien intenta acceder a una ruta protegida
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = !!localStorage.getItem('usuarioActual'); // Verifica si hay un usuario logueado en el localStorage

    if (!isLoggedIn) {
      // Si el usuario no está autenticado, lo redirigimos al home
      console.log('Usuario no autenticado. Redirigiendo a la página de login o inicio...');
      this.router.navigate(['/home']); // Redirige al home
      return false; // Bloquea el acceso
    }

    console.log('Acceso permitido');
    return true; // Permite el acceso a la ruta
  }
}
