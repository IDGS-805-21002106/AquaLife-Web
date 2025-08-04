import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AquaService } from '../../services/aqua.service';
import { AuthService } from '../../services/auth.service';
import { NgIf,} from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, NavbarComponent, NgIf, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: any = null;

  constructor(
    private servicio: AquaService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const correo = payload.email || payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

      this.servicio.getUsuarioPorCorreo(correo).subscribe({
        next: (res) => this.usuario = res,
        error: (err) => console.error('Error al obtener usuario', err)
      });
    }
  }

  guardarCambios(): void {
    if (this.usuario && this.usuario.id) {
      this.servicio.putUsuario(this.usuario.id, this.usuario).subscribe({
        next: () => alert('Datos actualizados correctamente'),
        error: () => alert('Error al actualizar los datos')
      });
    }
  }

  cerrarSesion(): void {
    this.auth.logout();
  }
}
