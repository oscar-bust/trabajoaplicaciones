import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  clasesDisponibles: any[] = [];  // Lista de clases disponibles
  tipoUsuario: string | null = null;  // Variable para almacenar el tipo de usuario (alumno o profesor)

  constructor() {}

  ngOnInit() {
    // Obtener el tipo de usuario desde localStorage
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      try {
        const usuarioObj = JSON.parse(usuarioData);
        this.tipoUsuario = usuarioObj.tipoUsuario || 'Desconocido'; // Asignamos el tipo de usuario
      } catch (e) {
        console.error('Error al parsear usuarioActual:', e);
      }
    } else {
      console.error('No se encontraron datos del usuario en localStorage.');
    }

    // Obtener las secciones guardadas en localStorage
    const seccionesGuardadas = localStorage.getItem('seccionesDisponibles');
    if (seccionesGuardadas) {
      try {
        this.clasesDisponibles = JSON.parse(seccionesGuardadas);
      } catch (e) {
        console.error('Error al parsear seccionesDisponibles:', e);
      }
    }
  }

  // Método para inscribirse en una clase
  inscribirseEnClase(claseId: number) {
    if (this.tipoUsuario === 'alumno') {
      const usuarioData = localStorage.getItem('usuarioActual');
      if (usuarioData) {
        try {
          const usuarioObj = JSON.parse(usuarioData);

          // Buscar la clase seleccionada
          const claseSeleccionada = this.clasesDisponibles.find(clase => clase.id === claseId);

          if (claseSeleccionada) {
            // Verificar si el alumno ya está inscrito
            if (!claseSeleccionada.estudiantes.includes(usuarioObj.nombre)) {
              // Inscribir al alumno
              claseSeleccionada.estudiantes.push(usuarioObj.nombre);

              // Guardar nuevamente las clases con el alumno inscrito en localStorage
              localStorage.setItem('seccionesDisponibles', JSON.stringify(this.clasesDisponibles));

              console.log(`${usuarioObj.nombre} se ha inscrito en la clase ${claseSeleccionada.nombreSeccion}.`);
            } else {
              console.log(`${usuarioObj.nombre} ya está inscrito en esta clase.`);
            }
          }
        } catch (e) {
          console.error('Error al parsear usuario actual al inscribirse en la clase:', e);
        }
      }
    } else {
      console.log('Solo los alumnos pueden inscribirse en clases.');
    }
  }
}
