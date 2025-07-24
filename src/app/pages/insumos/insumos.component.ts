import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NgFor } from '@angular/common';
import {NgIf} from '@angular/common';

interface Movimiento {
  fecha: string;
  tipo: 'entrada' | 'salida';
  cantidad: number;
  costo?: number;
  existencias: number;
  promedio: number;
  debe?: number;
  haber?: number;
  saldo: number;
}

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [RouterModule, FormsModule, DecimalPipe, NgFor, NgIf],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.css'
})
export class InsumosComponent {

  nuevoMovimiento = {
    producto: '',
    fecha: '',
    tipo: 'entrada' as 'entrada' | 'salida',
    cantidad: 0,
    costo: 0
  };

  tarjetas: { [producto: string]: Movimiento[] } = {};

  productoSeleccionado: string = '';

  get productosDisponibles(): string[] {
    return Object.keys(this.tarjetas);
  }

  agregarMovimiento() {
    const { producto, fecha, tipo, cantidad, costo } = this.nuevoMovimiento;

    if (!producto || !fecha || !tipo || cantidad <= 0 || (tipo === 'entrada' && costo <= 0)) {
      alert('Completa todos los campos correctamente');
      return;
    }

    if (!this.tarjetas[producto]) {
      this.tarjetas[producto] = [];
    }

    const movimientos = this.tarjetas[producto];
    const anterior = movimientos[movimientos.length - 1];

    let existencias = anterior ? anterior.existencias : 0;
    let saldo = anterior ? anterior.saldo : 0;
    let promedio = anterior ? anterior.promedio : 0;

    let nuevo: Movimiento = {
      fecha,
      tipo,
      cantidad,
      costo,
      existencias: 0,
      promedio: 0,
      saldo: 0
    };

    if (tipo === 'entrada') {
      nuevo.debe = cantidad * costo;
      nuevo.existencias = existencias + cantidad;
      nuevo.saldo = saldo + nuevo.debe;
      nuevo.promedio = Math.floor(nuevo.saldo / nuevo.existencias);
    } else {
      nuevo.haber = cantidad * promedio;
      nuevo.existencias = existencias - cantidad;
      nuevo.saldo = saldo - nuevo.haber;
      nuevo.promedio = promedio;
    }

    movimientos.push(nuevo);

    this.nuevoMovimiento = {
      producto: '',
      fecha: '',
      tipo: 'entrada',
      cantidad: 0,
      costo: 0
    };

    this.productoSeleccionado = producto;
  }

  getExistencias(producto: string): number {
    const movimientos = this.tarjetas[producto] || [];
    return movimientos.length > 0 ? movimientos[movimientos.length - 1].existencias : 0;
  }

  getPromedio(producto: string): number {
    const movimientos = this.tarjetas[producto] || [];
    return movimientos.length > 0 ? movimientos[movimientos.length - 1].promedio : 0;
  }
}
