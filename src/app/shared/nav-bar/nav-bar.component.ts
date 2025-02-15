import {Component, inject, OnInit} from '@angular/core';
import {UsuarioService} from '../../Usuario/service/usuario.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-nav-bar',
  imports: [
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  usuarioService = inject(UsuarioService);
  usuario: string = '';
  fechaCreacion: Date | null = null;
  fechaExpiracion: Date | null = null;


  ngOnInit(): void {
    const token = this.usuarioService.getToken();
    if (token) {
      this.decodificarToken(token);
    }

  }

  decodificarToken(token: string): void {
    const datosToken = this.obtenerDatosToken(token);
    if (datosToken) {
      this.usuario = datosToken.usuario;
      this.fechaCreacion = datosToken.fechaCreacion;
      this.fechaExpiracion = datosToken.fechaExpiracion;

    } else {
      console.log("Error al decodificar el token");
    }
  }

  obtenerDatosToken(token: string) {
    try {
      const decodedToken: any = jwtDecode(token);

      const usuario: string = decodedToken.sub;
      const fechaCreacion = decodedToken.iat;
      const fechaExpiracion = decodedToken.exp;

      const fechaCreacionLegible = new Date(fechaCreacion * 1000);
      const fechaExpiracionLegible = new Date(fechaExpiracion * 1000);

      console.log('Usuario:', usuario);
      console.log('Fecha de creación:', fechaCreacionLegible);
      console.log('Fecha de expiración:', fechaExpiracionLegible);

      return { usuario, fechaCreacion: fechaCreacionLegible, fechaExpiracion: fechaExpiracionLegible };
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }


}
