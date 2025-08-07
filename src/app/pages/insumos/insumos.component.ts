import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { AquaService } from '../../services/aqua.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


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
  imports: [RouterModule, FormsModule, DecimalPipe, NgFor, NgIf, NavbarComponent, FooterComponent],
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {
  insumos: any[] = [];
  tarjetas: { [producto: string]: Movimiento[] } = {};
  productoSeleccionado: string = '';

  nuevoMovimiento = {
    producto: '',
    unidadMedida: 'unidad',
    fecha: new Date().toISOString().split('T')[0],
    tipo: 'entrada' as 'entrada' | 'salida',
    cantidad: 1,
    costo: 0
  };

  constructor(private servicio: AquaService) {}

  ngOnInit(): void {
    this.cargarInsumos();
  }

  cargarInsumos(): void {
    this.servicio.getInsumos().subscribe({
      next: (data) => {
        this.insumos = data;
        this.procesarMovimientos(data);
        if (this.insumos.length > 0) {
          this.productoSeleccionado = this.insumos[0].nombre;
        }
      },
      error: (err) => console.error('Error al cargar insumos:', err)
    });
  }

  procesarMovimientos(data: any[]): void {
    this.tarjetas = {};
    data.forEach(insumo => {
      const movimientos = insumo.movimientos || [];
      let existencias = 0;
      let saldo = 0;
      let promedio = 0;

      this.tarjetas[insumo.nombre] = movimientos.map((mov: any) => {
        const movimiento: Movimiento = {
          fecha: new Date(mov.fecha).toLocaleDateString(),
          tipo: mov.tipo,
          cantidad: mov.cantidad,
          costo: mov.costoUnitario || 0,
          existencias: 0,
          promedio: 0,
          saldo: 0,
          debe: mov.debe || 0,
          haber: mov.haber || 0
        };

        if (mov.tipo === 'entrada') {
          movimiento.debe = mov.cantidad * (mov.costoUnitario || 0);
          existencias += mov.cantidad;
          saldo += movimiento.debe;
          promedio = saldo / existencias;
        } else {
          movimiento.haber = mov.cantidad * promedio;
          existencias -= mov.cantidad;
          saldo -= movimiento.haber;
        }

        movimiento.existencias = existencias;
        movimiento.saldo = saldo;
        movimiento.promedio = promedio;

        return movimiento;
      });
    });
  }

  agregarMovimiento(): void {
    if (!this.validarMovimiento()) return;

    const insumoExistente = this.insumos.find(
      i => i.nombre.toLowerCase() === this.nuevoMovimiento.producto.trim().toLowerCase()
    );

    if (insumoExistente) {
      this.registrarMovimiento(insumoExistente.id);
    } else {
      if (this.nuevoMovimiento.tipo === 'entrada') {
        this.crearYRegistrarInsumo();
      } else {
        alert('No puede registrar salida de un insumo no existente');
      }
    }
  }

  validarMovimiento(): boolean {
    const { producto, fecha, tipo, cantidad, costo } = this.nuevoMovimiento;
    
    if (!producto || !fecha) {
      alert('Complete todos los campos obligatorios');
      return false;
    }

    if (cantidad <= 0) {
      alert('La cantidad debe ser mayor a cero');
      return false;
    }

    if (tipo === 'entrada' && costo <= 0) {
      alert('Ingrese un costo válido para entradas');
      return false;
    }

    return true;
  }

  registrarMovimiento(insumoId: number): void {
    const movimiento = {
      insumoId: insumoId,
      fecha: new Date(this.nuevoMovimiento.fecha).toISOString(),
      tipo: this.nuevoMovimiento.tipo,
      cantidad: this.nuevoMovimiento.cantidad,
      costoUnitario: this.nuevoMovimiento.tipo === 'entrada' ? this.nuevoMovimiento.costo : null
    };

    this.servicio.postMovimiento(movimiento).subscribe({
      next: () => {
        this.cargarInsumos();
        this.resetearFormulario();
        alert('Movimiento registrado correctamente');
      },
      error: (err) => {
        console.error('Error al registrar movimiento:', err);
        alert('Error al registrar movimiento. Verifique la consola para más detalles.');
      }
    });
  }

  crearYRegistrarInsumo(): void {
    const nuevoInsumo = {
      nombre: this.nuevoMovimiento.producto.trim(),
      cantidadDisponible: 0,
      unidadMedida: this.nuevoMovimiento.unidadMedida
    };

    this.servicio.postInsumo(nuevoInsumo).subscribe({
      next: (res: any) => {
        this.registrarMovimiento(res.id);
      },
      error: (err) => {
        console.error('Error al crear insumo:', err);
        alert('Error al crear nuevo insumo');
      }
    });
  }

  resetearFormulario(): void {
    this.nuevoMovimiento = {
      producto: '',
      unidadMedida: 'unidad',
      fecha: new Date().toISOString().split('T')[0],
      tipo: this.nuevoMovimiento.tipo,
      cantidad: 1,
      costo: 0
    };
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