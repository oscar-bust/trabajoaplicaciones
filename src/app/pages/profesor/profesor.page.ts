import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  rut: string = '';
  tipoUsuario: string = '';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    const usuario = localStorage.getItem('usuarioActual'); // Cambia 'usuario' por 'usuarioActual'

    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.nombre = usuarioObj.nombre || '';
      this.apellido = usuarioObj.apellido || '';
      this.correo = usuarioObj.email || '';
      this.rut = usuarioObj.rut || '';
      this.tipoUsuario = usuarioObj.tipoUsuario || 'Desconocido'; // Asignar el tipo de usuario
    } else {
      console.error('No se encontraron datos del usuario en localStorage.');
      this.nombre = 'No disponible';
      this.apellido = 'No disponible';
      this.correo = 'No disponible';
      this.rut = 'No disponible';
      this.tipoUsuario = 'Desconocido'; // Manejar caso sin usuario
    }
  }

  logout() {
    localStorage.removeItem('usuarioActual'); // Opcional: eliminar el usuario del localStorage
    this.navCtrl.navigateRoot('/home');
  }
}
