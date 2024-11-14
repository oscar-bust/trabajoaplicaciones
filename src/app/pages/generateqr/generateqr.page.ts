import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Si usas un servicio
// Si no usas el servicio AuthService, simplemente accedes directamente a localStorage

@Component({
  selector: 'app-generateqr',
  templateUrl: './generateqr.page.html',
  styleUrls: ['./generateqr.page.scss'],
})
export class GenerateqrPage implements OnInit {

  nombre: string = '';   
  apellido: string = ''; 
  qrValue: string = '';  

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
    const usuarioLogueado = this.authService.getUser();
    console.log('Usuario logueado:', usuarioLogueado);  
    
    if (usuarioLogueado && usuarioLogueado.nombre && usuarioLogueado.apellido) {
      this.nombre = usuarioLogueado.nombre;
      this.apellido = usuarioLogueado.apellido;
    } else {
      console.error('No se encontraron los datos del usuario logueado');
    }
  }

  generarQR() {
   
    if (this.nombre && this.apellido) {
     
      this.qrValue = `${this.nombre} ${this.apellido}|PGY4121|012D|L9|${this.generarFecha()}`;
    } else {
      console.error('Los datos del usuario (nombre, apellido) están vacíos');
    }
  }

  generarFecha(): string {

    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${anio}${mes}${dia}`;
  }
}
