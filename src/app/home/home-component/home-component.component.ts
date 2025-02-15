import { Component } from '@angular/core';
import {PlantaComponentComponent} from '../../plantas/planta-component/planta-component.component';

@Component({
  selector: 'app-home-component',
  imports: [
    PlantaComponentComponent
  ],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
