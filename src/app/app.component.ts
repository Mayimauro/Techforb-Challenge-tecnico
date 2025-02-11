import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {IniSesPageComponent} from './Usuario/inicioSesion/ini-ses-page/ini-ses-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IniSesPageComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Techforb-challenge';
}
