import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = !!localStorage.getItem('usuarioActual'); 

    if (!isLoggedIn) {
    
      console.log('Usuario no autenticado. Redirigiendo a la página de login o inicio...');
      this.router.navigate(['/home']);
      return false; 
    }

    console.log('Acceso permitido');
    return true; 
  }
}
