import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AquaService } from '../../services/aqua.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit {
  proveedores: any[] = [];
  compras: any[] = [];

  compra: {
    id: number | null,
    proveedorId: number | null,
    insumo: string,
    cantidad: number,
    precioUnitario: number,
    fecha: string
  } = {
    id: null,
    proveedorId: null,
    insumo: '',
    cantidad: 0,
    precioUnitario: 0,
    fecha: ''
  };

  modoEdicion: boolean = false;

  constructor(private servicio: AquaService) {}

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarCompras();
  }

  cargarProveedores() {
    this.servicio.getProveedores().subscribe({
      next: (data) => this.proveedores = data,
      error: () => alert('Error al obtener proveedores')
    });
  }

  cargarCompras() {
    this.servicio.getCompras().subscribe({
      next: (data) => this.compras = data,
      error: () => alert('Error al obtener compras')
    });
  }

  guardarCompra() {
    const nuevaCompra = {
      proveedorId: this.compra.proveedorId!,
      fecha: this.compra.fecha,
      total: this.compra.precioUnitario * this.compra.cantidad,
      detallesCompra: [
        {
          nombreInsumo: this.compra.insumo, 
          cantidad: this.compra.cantidad,
          precioUnitario: this.compra.precioUnitario
        }
      ]
    };

    if (this.modoEdicion && this.compra.id !== null) {
      this.servicio.putCompra(this.compra.id, nuevaCompra).subscribe({
        next: () => {
          alert('Compra actualizada');
          this.cancelar();
          this.cargarCompras();
        },
        error: () => alert('Error al actualizar compra')
      });
    } else {
      this.servicio.postCompra(nuevaCompra).subscribe({
        next: () => {
          alert('Compra registrada');
          this.cancelar();
          this.cargarCompras();
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar compra');
        }
      });
    }
  }

  editar(compra: any) {
    const detalle = compra.detallesCompra?.[0] || {};
    this.compra = {
      id: compra.id,
      proveedorId: compra.proveedorId,
      insumo: detalle.nombreInsumo || '', 
      cantidad: detalle.cantidad || 0,
      precioUnitario: detalle.precioUnitario || 0,
      fecha: compra.fecha
    };
    this.modoEdicion = true;
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar esta compra?')) {
      this.servicio.deleteCompra(id).subscribe({
        next: () => this.cargarCompras(),
        error: () => alert('Error al eliminar')
      });
    }
  }

  cancelar() {
    this.compra = {
      id: null,
      proveedorId: null,
      insumo: '',
      cantidad: 0,
      precioUnitario: 0,
      fecha: ''
    };
    this.modoEdicion = false;
  }
}
