import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  rut: string = '';
  tipoUsuario: string = ''; // Agregar la propiedad tipoUsuario

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.nombre = usuarioObj.nombre || '';
      this.apellido = usuarioObj.apellido || '';
      this.correo = usuarioObj.email || '';  
      this.rut = usuarioObj.rut || '';
      this.tipoUsuario = usuarioObj.tipoUsuario || 'Desconocido'; // Asignar el tipo de usuario
    } else {
      console.error('No se encontraron datos del alumno en localStorage.');
      this.nombre = 'No disponible';
      this.apellido = 'No disponible';
      this.correo = 'No disponible';
      this.rut = 'No disponible';
      this.tipoUsuario = 'Desconocido'; // Manejar caso sin usuario
    }
  }

  logout() {
    this.navCtrl.navigateRoot('/home');
  }
}
