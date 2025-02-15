import { Component } from '@angular/core';
import {NuevaPlantaModalComponent} from '../nueva-planta-modal/nueva-planta-modal.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-planta-component',
  imports: [
    NuevaPlantaModalComponent,
    NgIf
  ],
  templateUrl: './planta-component.component.html',
  styleUrl: './planta-component.component.css'
})
export class PlantaComponentComponent {

  isModalOpen = false;

  abrirModal() {
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

}
