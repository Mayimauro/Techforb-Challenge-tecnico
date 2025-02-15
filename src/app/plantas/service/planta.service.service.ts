import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { plantaInterface } from '../interface/planta.interface';
import {UsuarioService} from '../../Usuario/service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PlantaServiceService {

  private plantasURL = environment.urlPlantas;

  constructor(private http: HttpClient, private cookieService: UsuarioService) { }

  // Obtener token de las cookies
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.getToken();
    console.log('Token enviado:', token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtener todas las plantas
  getPlantas(): Observable<plantaInterface[]> {
    return this.http.get<plantaInterface[]>(this.plantasURL, { headers: this.getHeaders() });
  }

  // Obtener una planta por ID
  getPlantaById(id: number): Observable<plantaInterface> {
    return this.http.get<plantaInterface>(`${this.plantasURL}/${id}`, { headers: this.getHeaders() });
  }

  crearPlanta(planta: plantaInterface): Observable<plantaInterface> {
    return this.http.post<plantaInterface>(this.plantasURL, planta, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }

  // Eliminar una planta por ID
  eliminarPlanta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.plantasURL}/${id}`, { headers: this.getHeaders() });
  }

}
