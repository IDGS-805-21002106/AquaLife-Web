import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AquaService } from '../../services/aqua.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {

  ventas: any[] = [];

  venta = {
    id: null,
    cliente: '',
    fecha: '',
    detallesVenta: [
      { nombreProducto: '', cantidad: 0, precioUnitario: 0 }
    ],
    total: 0
  };

  modoEdicion: boolean = false;

  constructor(private servicio: AquaService) {}

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas() {
    this.servicio.getVentas().subscribe({
      next: (res) => this.ventas = res,
      error: () => alert("Error al obtener ventas")
    });
  }

  guardarVenta() {
    this.actualizarTotal(); 

    const ventaData = {
      nombreCliente: this.venta.cliente,
      fecha: this.venta.fecha,
      total: this.venta.total,
      detallesVenta: this.venta.detallesVenta.map(d => ({
        nombreProducto: d.nombreProducto,
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario
      }))
    };

    if (this.modoEdicion && this.venta.id != null) {
      this.servicio.putVenta(this.venta.id, ventaData).subscribe({
        next: () => {
          alert('Venta actualizada');
          this.cancelar();
          this.obtenerVentas();
        },
        error: () => alert('Error al actualizar venta')
      });
    } else {
      this.servicio.postVenta(ventaData).subscribe({
        next: () => {
          alert('Venta registrada');
          this.cancelar();
          this.obtenerVentas();
        },
        error: () => alert('Error al registrar venta')
      });
    }
  }

  editar(venta: any) {
    this.venta = {
      id: venta.id,
      cliente: venta.nombreCliente || venta.usuario?.nombre || '',
      fecha: venta.fecha?.substring(0, 10),
      total: venta.total,
      detallesVenta: (venta.detallesVenta || []).map((d: any) => ({
        nombreProducto: d.nombreProducto || d.producto?.nombre || '',
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario
      }))
    };
    this.modoEdicion = true;
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar esta venta?')) {
      this.servicio.deleteVenta(id).subscribe({
        next: () => this.obtenerVentas(),
        error: () => alert('Error al eliminar venta')
      });
    }
  }

  cancelar() {
    this.venta = {
      id: null,
      cliente: '',
      fecha: '',
      total: 0,
      detallesVenta: [
        { nombreProducto: '', cantidad: 0, precioUnitario: 0 }
      ]
    };
    this.modoEdicion = false;
  }

  actualizarTotal() {
    this.venta.total = this.venta.detallesVenta.reduce((acc, d) => acc + (d.cantidad * d.precioUnitario), 0);
  }

  agregarDetalle() {
    this.venta.detallesVenta.push({ nombreProducto: '', cantidad: 0, precioUnitario: 0 });
  }

  eliminarDetalle(index: number) {
    if (this.venta.detallesVenta.length > 1) {
      this.venta.detallesVenta.splice(index, 1);
      this.actualizarTotal();
    }
  }
}
