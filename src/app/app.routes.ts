import { Routes } from '@angular/router';
import {HomePageComponent} from './home/home-page/home-page.component';
import {IniSesPageComponent} from './Usuario/inicioSesion/ini-ses-page/ini-ses-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: IniSesPageComponent },
];
