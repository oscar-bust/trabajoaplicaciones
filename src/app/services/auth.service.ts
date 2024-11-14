import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  getUser() {
    return JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  }

 
  login(user: any) {
    localStorage.setItem('usuarioActual', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('usuarioActual');
  }
}
