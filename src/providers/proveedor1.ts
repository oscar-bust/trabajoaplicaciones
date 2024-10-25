import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Proveedor1Provider {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // URL de la API

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any[]> { // Ajusta el tipo si conoces la estructura
    return this.http.get<any[]>(this.apiUrl); // Realiza la solicitud GET
  }
}
