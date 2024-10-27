import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; 
import { Proveedor1Provider } from '../../../providers/proveedor1';

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
  usuarios: any[] = [];
  mostrarAlumnos: boolean = false; 

  constructor(
    private navCtrl: NavController,
    public proveedor: Proveedor1Provider,
    public alertController: AlertController 
  ) {}

  ngOnInit() {
    const usuario = localStorage.getItem('usuarioActual');

    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.nombre = usuarioObj.nombre || '';
      this.apellido = usuarioObj.apellido || '';
      this.correo = usuarioObj.email || '';
      this.rut = usuarioObj.rut || '';
      this.tipoUsuario = usuarioObj.tipoUsuario || 'Desconocido';
    } else {
      console.error('No se encontraron datos del usuario en localStorage.');
      this.nombre = 'No disponible';
      this.apellido = 'No disponible';
      this.correo = 'No disponible';
      this.rut = 'No disponible';
      this.tipoUsuario = 'Desconocido';
    }
  }

  ionViewWillEnter() {
    this.proveedor.obtenerDatos()
      .subscribe(
        (data) => {
          this.usuarios = data;
          console.log('Usuarios obtenidos:', this.usuarios);
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }

  toggleAlumnos() {
    this.mostrarAlumnos = !this.mostrarAlumnos; 
  }

  async logout() {
    localStorage.removeItem('usuarioActual'); 
    const alert = await this.alertController.create({
      header: 'Sesión cerrada',
      message: 'Has cerrado sesión correctamente.',
      buttons: ['Aceptar']
    });
    await alert.present(); 
    this.navCtrl.navigateRoot('/home'); 
  }
}
