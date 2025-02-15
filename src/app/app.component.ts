import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UsuarioService} from './Usuario/service/usuario.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private authService: UsuarioService) {}

  ngOnInit() {
    setInterval(() => {
      this.authService.checkSession();
    }, 60000); // Verificar cada minuto
  }


}
