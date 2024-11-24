import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Proveedor1Provider {
  private apiUrlUsuarios = 'https://jsonplaceholder.typicode.com/users'; // URL para obtener los usuarios

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios (alumnos)
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsuarios);
  }

  // Método para obtener las clases disponibles (simuladas)
  obtenerClases(): Observable<any[]> {
    return new Observable((observer) => {
      // Datos simulados de las clases
      const clases = [
        {
          id: 1,
          nombre: 'Matemáticas Avanzadas',
          profesor: 'Carlos Pérez',
          descripcion: 'Clase avanzada sobre álgebra y cálculo',
          alumnosInscritos: [1, 2, 3], // IDs de alumnos inscritos (de jsonplaceholder)
        },
        {
          id: 2,
          nombre: 'Historia Universal',
          profesor: 'María López',
          descripcion: 'Repaso de las civilizaciones antiguas',
          alumnosInscritos: [4, 5], // IDs de alumnos inscritos
        },
        {
          id: 3,
          nombre: 'Física Cuántica',
          profesor: 'Juan Martínez',
          descripcion: 'Introducción a la física cuántica',
          alumnosInscritos: [2, 5, 6], // Otros IDs de alumnos
        },
      ];

      observer.next(clases);
      observer.complete();
    });
  }

  // Método para obtener los detalles de una clase específica
  obtenerClasePorId(claseId: number): Observable<any> {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${claseId}`);
  }
}
