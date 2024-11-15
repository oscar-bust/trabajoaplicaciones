import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private alumnosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private mostrarAlumnosSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { 
    this.cargarUsuarioDelLocalStorage();
  }

  cargarUsuarioDelLocalStorage() {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      const usuario = JSON.parse(usuarioData);
      this.usuarioSubject.next(usuario);
    }
  }

  obtenerUsuario() {
    return this.usuarioSubject.asObservable();
  }

  obtenerAlumnos() {
    return this.alumnosSubject.asObservable();
  }

  obtenerMostrarAlumnos() {
    return this.mostrarAlumnosSubject.asObservable();
  }

  actualizarAlumnos(usuarios: any[]) {
    const alumnos = usuarios.filter(usuario => usuario.tipoUsuario === 'alumno');
    this.alumnosSubject.next(alumnos);
  }

  toggleMostrarAlumnos() {
    const currentValue = this.mostrarAlumnosSubject.value;
    this.mostrarAlumnosSubject.next(!currentValue);
  }

  cambiarUsuario(usuario: any) {
    this.usuarioSubject.next(usuario);
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  }

  logout() {
    localStorage.removeItem('usuarioActual');
    this.usuarioSubject.next(null);
  }
}
