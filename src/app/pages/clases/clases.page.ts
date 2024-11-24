import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  // Lista estática de clases disponibles
  clasesDisponibles: any[] = [
    {
      id: 1,
      nombreClase: 'Matemáticas Avanzadas',
      profesor: 'Profesor Juan Pérez',
      estudiantes: ['Alumno 1', 'Alumno 2', 'Alumno 3'],
    },
    {
      id: 2,
      nombreClase: 'Física 101',
      profesor: 'Profesora María Gómez',
      estudiantes: ['Alumno 4', 'Alumno 5'],
    },
    {
      id: 3,
      nombreClase: 'Química Básica',
      profesor: 'Profesor Carlos Ruiz',
      estudiantes: ['Alumno 6', 'Alumno 7', 'Alumno 8'],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
