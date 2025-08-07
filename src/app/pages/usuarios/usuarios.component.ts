import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AquaService } from '../../services/aqua.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  nuevoUsuario = {
    nombreCompleto: '',
    correo: '',
    rol: 'Cliente',
    contrasena: ''
  };

  editando: boolean = false;
  usuarioEditandoId: number | null = null;

  constructor(private servicio: AquaService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.servicio.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  registrarUsuario() {
    if (this.editando) {
      
      this.servicio.putUsuario(this.usuarioEditandoId!, this.nuevoUsuario).subscribe(() => {
        this.obtenerUsuarios();
        this.limpiarFormulario();
      });
    } else {
      
      this.servicio.postUsuario(this.nuevoUsuario).subscribe(() => {
        this.obtenerUsuarios();
        this.limpiarFormulario();
      });
    }
  }

  editarUsuario(usuario: any) {
    this.nuevoUsuario = { ...usuario }; 
    this.usuarioEditandoId = usuario.id;
    this.editando = true;
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.servicio.deleteUsuario(id).subscribe(() => {
        this.obtenerUsuarios();
      });
    }
  }

  limpiarFormulario() {
    this.nuevoUsuario = {
      nombreCompleto: '',
      correo: '',
      rol: 'Cliente',
      contrasena: ''
    };
    this.editando = false;
    this.usuarioEditandoId = null;
  }
}
