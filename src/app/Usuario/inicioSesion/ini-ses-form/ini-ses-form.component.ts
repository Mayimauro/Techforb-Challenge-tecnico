import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsuarioService} from '../../service/usuario.service';
import {UsuarioInterface} from '../../interface/usuario.interface';
import {NgIf} from '@angular/common';
import {CredencialesInterface} from '../../interface/credenciales.interface';
import {routes} from '../../../app.routes';
import {Router} from '@angular/router';

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
  router = inject(Router);
  mostrarContrasena=false;
  mostrarRegistrarseForm= false

  formularioInicioSesion = this.fb.nonNullable.group({
    username: ['', Validators.required],
    contrasenia: ['', Validators.required]
  })

  formularioRegistro = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, Validators.minLength(8)]],
    repetirContrasenia: ['', Validators.required]
  }, { validators: this.passwordsCoinciden });

  get fr() {
    return this.formularioRegistro.controls;
  }

  passwordsCoinciden(form: any) {
    const password = form.get('contrasenia')?.value;
    const confirmPassword = form.get('repetirContrasenia')?.value;

    return password === confirmPassword ? null : { noCoincide: true };
  }

  verificarDatosLogIn() {

    console.log(this.formularioInicioSesion.getRawValue())

    let credenciales: CredencialesInterface = {
      username: this.formularioInicioSesion.getRawValue().username,
      password: this.formularioInicioSesion.getRawValue().contrasenia,
    }

    this.usuarioService.login(credenciales).subscribe(response => {
      console.log("inicio de sesion exitoso.");
      this.router.navigate(['/home']);

    });

  }

  verificarDatosRegistro(){

    console.log(this.formularioRegistro.getRawValue());

    let usuario: UsuarioInterface = {
      email: this.formularioRegistro.getRawValue().email,
      username: this.formularioRegistro.getRawValue().username,
      password: this.formularioRegistro.getRawValue().contrasenia,

    };

    this.usuarioService.register(usuario).subscribe(response => {
      if(response){
        this.mostrarRegistrarseForm = false;
      }
    })

  }

  alternarVisibilidad() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

}
