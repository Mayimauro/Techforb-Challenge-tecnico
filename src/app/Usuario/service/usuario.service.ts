import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {UsuarioInterface} from '../interface/usuario.interface';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiURLBD;


  constructor(private http: HttpClient, private cookieService: CookieService) {}


  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}login`, credentials).pipe(
      tap(response => {
        this.guardarToken(response.token);
      })
    );
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}register`, user).pipe(
      tap(response => {
        this.guardarToken(response.token);
      })
    );
  }

  logout(): void {
    this.cookieService.delete('authToken', '/');
  }

  private guardarToken(token: string): void {
    this.cookieService.set('authToken', token, { path: '/', secure: true, sameSite: 'Lax' });
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }


}
