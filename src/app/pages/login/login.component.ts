import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AquaService } from '../../services/aqua.service';
import { NavbarComponent } from '../navbar/navbar.component';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';

  registro = {
  nombreCompleto: '',
  correo: '',
  contrasena: ''
};

  constructor(private servicio: AquaService, private router: Router) {}

  login() {
    const datos = {
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.servicio.login(datos).subscribe({
  next: (res) => {
    localStorage.setItem('token', res.token);
    localStorage.setItem('usuario', JSON.stringify(res.usuario)); 
    alert('Login exitoso');
    this.router.navigate(['/inicio']); 
  },
  error: () => alert('Credenciales inválidas')
});
  }

  registrar() {
  this.servicio.postUsuario2(this.registro).subscribe({
    next: () => {
      alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
      const modal = document.getElementById('modalRegistro');
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      this.registro = { nombreCompleto: '', correo: '', contrasena: '' };
    },
    error: (error) => {
      console.error('Error al registrar usuario:', error);
      alert(error.error || 'Error al registrar');
    }
  });
}
}
