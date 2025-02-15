import { Component } from '@angular/core';
import {HomeComponentComponent} from '../home-component/home-component.component';
import {NavBarComponent} from '../../shared/nav-bar/nav-bar.component';
import {SideBarComponent} from '../../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HomeComponentComponent,
    NavBarComponent,
    SideBarComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {



}
