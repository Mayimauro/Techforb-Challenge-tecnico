import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsuarioInterface} from '../interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiURL = environment.urlUsuariosBDD;


  constructor(private http: HttpClient) {}

  getUsuarioByEmail(email: String): Observable<UsuarioInterface> {
    return this.http.get<UsuarioInterface>(this.apiURL+email);
  }

  saveUser(UsuarioNuevo: UsuarioInterface): Observable<any> {
    return this.http.post(this.apiURL, UsuarioNuevo);
  }



}
