import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AquaService } from '../../services/aqua.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {

  proveedores: any[] = [];
  nuevoProveedor = {
    nombre: '',
    correo: '',
    telefono: '',
    ubicacion: ''
  };

  editando = false;
  proveedorEditandoId: number | null = null;

  constructor(private servicio: AquaService) {}

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.servicio.getProveedores().subscribe(data => {
      this.proveedores = data;
    });
  }

  guardarProveedor() {
    if (this.editando) {
      this.servicio.putProveedor(this.proveedorEditandoId!, this.nuevoProveedor).subscribe(() => {
        this.obtenerProveedores();
        this.limpiarFormulario();
      });
    } else {
      this.servicio.postProveedor(this.nuevoProveedor).subscribe(() => {
        this.obtenerProveedores();
        this.limpiarFormulario();
      });
    }
  }

  editarProveedor(prov: any) {
    this.nuevoProveedor = { ...prov };
    this.proveedorEditandoId = prov.id;
    this.editando = true;
  }

  eliminarProveedor(id: number) {
    if (confirm('¿Eliminar este proveedor?')) {
      this.servicio.deleteProveedor(id).subscribe(() => {
        this.obtenerProveedores();
      });
    }
  }

  limpiarFormulario() {
    this.nuevoProveedor = {
      nombre: '',
      correo: '',
      telefono: '',
      ubicacion: ''
    };
    this.editando = false;
    this.proveedorEditandoId = null;
  }
}
