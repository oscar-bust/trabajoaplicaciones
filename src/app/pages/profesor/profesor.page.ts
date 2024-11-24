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
  tipoUsuario: string | null = null;
  usuarios: any[] = [];
  mostrarAlumnos: boolean = false;

  constructor(
    private navCtrl: NavController,
    public proveedor: Proveedor1Provider,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    // Obtener los datos del usuario actual desde el localStorage
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      const usuarioObj = JSON.parse(usuarioData);
      this.nombre = usuarioObj.nombre || 'No disponible';
      this.apellido = usuarioObj.apellido || 'No disponible';
      this.correo = usuarioObj.email || 'No disponible';
      this.rut = usuarioObj.rut || 'No disponible';
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
    // Llamada al servicio para obtener los datos de los usuarios
    this.proveedor.obtenerUsuarios().subscribe(
      (data: any[]) => {
        this.usuarios = data; // Asignamos los usuarios a la propiedad
        console.log('Usuarios obtenidos:', this.usuarios);
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
  

  mostrarOpciones() {
  
    if (this.tipoUsuario === 'profesor') {
      this.navCtrl.navigateForward('/generateqr');
    } else if (this.tipoUsuario === 'alumno') {
      this.navCtrl.navigateForward('/scan');
    }
  }

  toggleAlumnos() {

    this.mostrarAlumnos = !this.mostrarAlumnos;
  }

  async logout() {

    localStorage.removeItem('usuarioActual');
    const alert = await this.alertController.create({
      header: 'Sesión cerrada',
      message: 'Has cerrado sesión correctamente.',
      buttons: ['Aceptar'],
    });
    await alert.present();
    this.navCtrl.navigateRoot('/home');
  }

  // Método para crear una clase/sección, solo visible para el tipo de usuario "profesor"
  crearClase() {
    if (this.tipoUsuario === 'profesor') {
      this.navCtrl.navigateForward('/crear-seccion'); // Navega a la página de creación de clases
    } else if (this.tipoUsuario === 'alumno') {
      this.navCtrl.navigateForward('/clase');  // Redirige a la página de clases disponibles para alumnos
    }
  }

  // Método para ver clases disponibles, solo visible si el tipo de usuario es 'alumno'
  verClasesDisponibles() {
    if (this.tipoUsuario === 'alumno') {
      this.navCtrl.navigateForward('/clases'); 
    }
  }
}
