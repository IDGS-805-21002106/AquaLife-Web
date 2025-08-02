import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AquaService } from '../../services/aqua.service';
import { NavbarComponent } from '../navbar/navbar.component';


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

  constructor(private servicio: AquaService, private router: Router) {}

  login() {
    const datos = {
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.servicio.login(datos).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        alert('Login exitoso');
        this.router.navigate(['/inicio']); 
      },
      error: () => alert('Credenciales inválidas')
    });
  }
}
