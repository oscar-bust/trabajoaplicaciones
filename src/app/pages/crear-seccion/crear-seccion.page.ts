import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-seccion',
  templateUrl: './crear-seccion.page.html',
  styleUrls: ['./crear-seccion.page.scss'],
})
export class CrearSeccionPage implements OnInit {
  // Lista de clases (secciones) creadas por el profesor logueado
  seccionesDisponibles: any[] = [];

  // Variables para la nueva sección
  nombreSeccion: string = '';
  descripcionSeccion: string = '';

  // Variable para almacenar el nombre del profesor logueado
  profesorLogueado: string = '';

  constructor() {}

  ngOnInit() {
    // Obtener el usuario logueado desde localStorage
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      const usuarioObj = JSON.parse(usuarioData);
      this.profesorLogueado = usuarioObj.nombre || 'Profesor Desconocido'; // Asignamos el nombre del profesor
    } else {
      console.error('No se encontraron datos del usuario en localStorage.');
    }

    // Obtener las secciones guardadas en localStorage si existen
    const seccionesGuardadas = localStorage.getItem('seccionesDisponibles');
    if (seccionesGuardadas) {
      this.seccionesDisponibles = JSON.parse(seccionesGuardadas);
    }
  }

  // Método para crear una nueva sección (clase)
  crearSeccion() {
    if (this.nombreSeccion && this.descripcionSeccion) {
      // Agregar la nueva sección a la lista de secciones del profesor
      const nuevaSeccion = {
        id: this.seccionesDisponibles.length + 1, // ID autoincremental
        nombreSeccion: this.nombreSeccion,
        profesor: this.profesorLogueado,
        descripcion: this.descripcionSeccion,
        estudiantes: [], // Lista vacía de estudiantes inicialmente
      };

      // Añadir la nueva sección a la lista
      this.seccionesDisponibles.push(nuevaSeccion);

      // Guardar las secciones actualizadas en localStorage
      localStorage.setItem('seccionesDisponibles', JSON.stringify(this.seccionesDisponibles));

      // Limpiar los campos del formulario
      this.limpiarFormulario();
    } else {
      console.error('Por favor, ingrese el nombre y la descripción de la sección.');
    }
  }

  // Limpiar el formulario después de crear la sección
  limpiarFormulario() {
    this.nombreSeccion = '';
    this.descripcionSeccion = '';
  }

  // Método para ver los estudiantes inscritos en una clase
  mostrarEstudiantes(claseId: number): string {
    const claseSeleccionada = this.seccionesDisponibles.find(clase => clase.id === claseId);
    if (claseSeleccionada && claseSeleccionada.estudiantes.length > 0) {
      return claseSeleccionada.estudiantes.join(', ');
    }
    return 'No hay estudiantes inscritos aún.';
  }

  // Método para obtener la cantidad de estudiantes inscritos
  obtenerCantidadEstudiantes(claseId: number): number {
    const claseSeleccionada = this.seccionesDisponibles.find(clase => clase.id === claseId);
    return claseSeleccionada ? claseSeleccionada.estudiantes.length : 0;
  }
}
