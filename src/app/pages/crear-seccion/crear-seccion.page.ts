import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Proveedor1Provider } from '../../../providers/proveedor1';

@Component({
  selector: 'app-crear-seccion',
  templateUrl: './crear-seccion.page.html',
  styleUrls: ['./crear-seccion.page.scss'],
})
export class CrearSeccionPage {
  nombreClase: string = '';
  descripcionClase: string = '';

  constructor(
    private navCtrl: NavController,
    private proveedor: Proveedor1Provider
  ) {}

  guardarClase() {
    const nuevaClase = {
      nombre: this.nombreClase,
      descripcion: this.descripcionClase,
      id: new Date().getTime() // Agregamos un ID único para la clase
    };
  
    // Obtener clases del localStorage, si existen
    let clases = JSON.parse(localStorage.getItem('clases') || '[]');
    clases.push(nuevaClase);
  
    // Guardar las clases actualizadas en localStorage
    localStorage.setItem('clases', JSON.stringify(clases));
  
    console.log('Clase creada:', nuevaClase);
  
    // Redirigir de vuelta al perfil del profesor
    this.navCtrl.navigateBack('/profesor');
  }
  


  

}
