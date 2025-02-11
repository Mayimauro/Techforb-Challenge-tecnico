import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsuarioService} from '../../service/usuario.service';
import {UsuarioInterface} from '../../interface/usuario.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-ini-ses-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './ini-ses-form.component.html',
  styleUrl: './ini-ses-form.component.css'
})
export class IniSesFormComponent {

  usuarioService= inject(UsuarioService);
  fb = inject(FormBuilder);
  mostrarContrasena=false;
  mostrarRegistrarseForm= false

  formularioInicioSesion = this.fb.nonNullable.group({
    email: ['', Validators.required],
    contrasenia: ['', Validators.required]
  })

  formularioRegistro= this.fb.nonNullable.group({
    nombreUsuario:['', Validators.required],
    email: ['', Validators.required],
    contrasenia: ['', Validators.required],
    repetirContrasenia: ['', Validators.required]
  })

  verificarDatos() {
    if(this.formularioInicioSesion.invalid){return}
    const emailAbuscar = this.formularioInicioSesion.getRawValue().email;
    this.usuarioService.getUsuarioByEmail(emailAbuscar).subscribe({
      next: (usuario: UsuarioInterface) => {
        console.log(usuario)
        if(usuario){
          if(usuario.email === emailAbuscar){
            localStorage.setItem('username', usuario.nombreUsuario);
            alert('Inicio de sesión exitoso');
          }
        } else {
          alert('Mail de usuario o contraseña incorrectos');
        }
      },
      error(err: any): void {
        console.error(err);
      }
    });
  }

  verificarDatosRegistro(){
    if(this.formularioRegistro.invalid){return}

    const emailAbuscar = this.formularioRegistro.getRawValue().email;
    this.usuarioService.getUsuarioByEmail(emailAbuscar).subscribe({
      next: (usuario: UsuarioInterface) => {
        if(usuario){
          if(usuario.email === emailAbuscar){
            alert('El email ya se encuentra registrado');
          }
        }else{
          const usuarioNuevo: UsuarioInterface = {
            nombreUsuario: this.formularioRegistro.getRawValue().nombreUsuario,
            email: this.formularioRegistro.getRawValue().email,
            contrasena: this.formularioRegistro.getRawValue().contrasenia,
          }
          this.guardarDatosRegistro(usuarioNuevo);
          this.mostrarRegistrarseForm = false;
        }
      },
      error(err: any): void {
        console.error(err);
      }
    });

  }

  guardarDatosRegistro(usuario: UsuarioInterface){
   this.usuarioService.saveUser(usuario).subscribe({})
  }

  alternarVisibilidad() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

}
