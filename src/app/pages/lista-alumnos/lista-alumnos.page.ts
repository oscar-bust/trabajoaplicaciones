import { Component, OnInit } from '@angular/core';
import { Proveedor1Provider } from '../../../providers/proveedor1'; // Asegúrate de que la importación sea correcta

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.page.html',
  styleUrls: ['./lista-alumnos.page.scss'],
})
export class ListaAlumnosPage implements OnInit {
  usuarios: any[] = [];

  constructor(private proveedor: Proveedor1Provider) {}

  ngOnInit() {
    this.cargarAlumnos();
  }

  ionViewWillEnter() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.proveedor.obtenerUsuarios().subscribe(
      (data: any[]) => {  // Especifico el tipo para 'data' como un array de 'any'
        if (Array.isArray(data) && data.length > 0) {
          // Filtramos solo los usuarios de tipo 'alumno'
          this.usuarios = data.filter((usuario: any) => usuario.tipoUsuario === 'alumno');
          console.log('Usuarios obtenidos:', this.usuarios);
        } else {
          console.error('No se encontraron datos de usuarios');
        }
      },
      (error: any) => {  // Especifico el tipo para 'error' como 'any'
        console.error('Error al obtener los datos:', error);
      }
    );
  }
  
}
