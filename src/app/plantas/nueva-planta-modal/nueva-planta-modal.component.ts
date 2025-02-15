import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlantaServiceService} from '../service/planta.service.service';
import {plantaInterface} from '../interface/planta.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-nueva-planta-modal',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './nueva-planta-modal.component.html',
  styleUrl: './nueva-planta-modal.component.css'
})
export class NuevaPlantaModalComponent {

  @Output() closeModal = new EventEmitter<void>();

  plantaService = inject(PlantaServiceService);
  fb = inject(FormBuilder);

  formularioPlantaNueva = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    ubicacion: ['', Validators.required]
  })


  onSubmit() {
    if (this.formularioPlantaNueva.valid) {
      console.log('Datos de la nueva planta:', this.formularioPlantaNueva.value);
      let plantaNueva: plantaInterface =
        {
          nombre: this.formularioPlantaNueva.getRawValue().nombre,
          ubicacion: this.formularioPlantaNueva.getRawValue().ubicacion,
          sensores: []
        }
      this.plantaService.crearPlanta(plantaNueva).subscribe({
        next: (response) => {
          console.log('Planta creada exitosamente:', response);
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al crear la planta:', err);
          alert('Hubo un problema al crear la planta. Intenta de nuevo.');
        }
      });
      this.cerrarModal();
    }
  }

  cerrarModal() {
    this.closeModal.emit();
  }



}
