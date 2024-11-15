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
    this.proveedor.obtenerDatos().subscribe(
      (data) => {
        
        this.usuarios = data.filter((usuario: any) => usuario.tipoUsuario === 'alumno');
        console.log('Usuarios filtrados (solo alumnos):', this.usuarios);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
  

  mostrarOpciones() {
    console.log('Tipo de usuario:', this.tipoUsuario);
    if (this.tipoUsuario === 'profesor') {
      this.navCtrl.navigateForward('/qrscan');
    } else if (this.tipoUsuario === 'alumno') {
      this.navCtrl.navigateForward('/generateqr');
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
      buttons: ['Aceptar']
    });
    await alert.present(); 
    this.navCtrl.navigateRoot('/home'); 
  }
}
