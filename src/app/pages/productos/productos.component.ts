import { Component, OnInit } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AquaService } from '../../services/aqua.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  productoInsumos: {
    insumoId: number;
    cantidad: number;
    insumo?: {
      nombre: string;
      unidadMedida: string;
    };
  }[];
}

interface Insumo {
  id: number;
  nombre: string;
  unidadMedida: string;
  cantidadDisponible: number;
  promedio: number; 
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  insumos: Insumo[] = [];

  nuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    insumos: [] as {
      insumoId: number;
      cantidad: number;
      insumoNombre?: string;
      unidadMedida?: string;
    }[]
  };

  nuevoInsumoProducto = {
    insumoId: 0,
    cantidad: 1
  };

  precioCalculado: number = 0;

  modoEdicion: boolean = false;
  productoEditandoId: number | null = null;

  constructor(private servicio: AquaService) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    this.cargarInsumos().then(() => {
      this.cargarProductos();
    });
  }

  cargarProductos(): void {
    this.servicio.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = data.map(producto => ({
          ...producto,
          productoInsumos: producto.productoInsumos.map(pi => ({
            ...pi,
            insumo: this.insumos.find(i => i.id === pi.insumoId) || {
              nombre: 'Insumo desconocido',
              unidadMedida: ''
            }
          }))
        }));
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        alert('Error al cargar productos. Verifique la consola para más detalles.');
      }
    });
  }

  cargarInsumos(): Promise<void> {
  return new Promise((resolve) => {
    this.servicio.getInsumos().subscribe({
      next: (data: Insumo[]) => {
        this.insumos = data;
        resolve();
      },
      error: (err) => {
        console.error('Error al cargar insumos:', err);
        alert('Error al cargar insumos. Verifique la consola para más detalles.');
        resolve();
      }
    });
  });
}


  agregarInsumoAProducto(): void {
    if (this.nuevoInsumoProducto.insumoId <= 0) {
      alert('Seleccione un insumo válido');
      return;
    }

    if (this.nuevoInsumoProducto.cantidad <= 0) {
      alert('La cantidad debe ser mayor a cero');
      return;
    }

    const insumoSeleccionado = this.insumos.find(i => i.id === this.nuevoInsumoProducto.insumoId);
    if (!insumoSeleccionado) {
      alert('Insumo no encontrado');
      return;
    }

    const indexExistente = this.nuevoProducto.insumos.findIndex(
      i => i.insumoId === this.nuevoInsumoProducto.insumoId
    );

    if (indexExistente >= 0) {
      if (confirm('Este insumo ya fue agregado. ¿Desea actualizar la cantidad?')) {
        this.nuevoProducto.insumos[indexExistente].cantidad = this.nuevoInsumoProducto.cantidad;
      }
    } else {
      this.nuevoProducto.insumos.push({
        insumoId: this.nuevoInsumoProducto.insumoId,
        cantidad: this.nuevoInsumoProducto.cantidad,
        insumoNombre: insumoSeleccionado.nombre,
        unidadMedida: insumoSeleccionado.unidadMedida
      });
    }

    this.nuevoInsumoProducto = { insumoId: 0, cantidad: 1 };
    this.calcularPrecio();
  }

  calcularPrecio(): void {
  let total = 0;
  this.nuevoProducto.insumos.forEach(insumoSel => {
    const insumoData = this.insumos.find(i => i.id === insumoSel.insumoId);
    if (insumoData && insumoData.promedio != null) {
      total += insumoData.promedio * insumoSel.cantidad;
    }
  });
  this.nuevoProducto.precio = total;
  this.precioCalculado = total;
}

  registrarProducto(): void {
    if (!this.nuevoProducto.nombre.trim()) {
      alert('El nombre del producto es requerido');
      return;
    }

    if (this.nuevoProducto.insumos.length === 0) {
      alert('Debe agregar al menos un insumo al producto');
      return;
    }

    if (this.modoEdicion && this.productoEditandoId != null) {
      this.actualizarProducto();
      return;
    }

    const productoData = {
      nombre: this.nuevoProducto.nombre,
      descripcion: this.nuevoProducto.descripcion,
      insumos: this.nuevoProducto.insumos.map(i => ({
        insumoId: i.insumoId,
        cantidad: i.cantidad
      }))
    };

    this.servicio.postProducto(productoData).subscribe({
      next: () => {
        this.cargarProductos();
        this.resetearFormulario();
        alert('Producto registrado correctamente');
      },
      error: (err) => {
        console.error('Error al registrar producto:', err);
        alert(`Error al registrar producto: ${err.error?.message || err.message || 'Error desconocido'}`);
      }
    });
  }

  actualizarProducto(): void {
    if (!this.productoEditandoId) return;

    const productoActualizado = {
      id: this.productoEditandoId,
      nombre: this.nuevoProducto.nombre,
      descripcion: this.nuevoProducto.descripcion,
      insumos: this.nuevoProducto.insumos.map(i => ({
        insumoId: i.insumoId,
        cantidad: i.cantidad
      }))
    };

    this.servicio.putProducto(this.productoEditandoId, productoActualizado).subscribe({
      next: () => {
        this.cargarProductos();
        this.resetearFormulario();
        alert('Producto actualizado correctamente');
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);
        alert('Error al actualizar producto');
      }
    });
  }

  editarProducto(producto: Producto): void {
  this.nuevoProducto = {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    insumos: producto.productoInsumos.map(i => ({
      insumoId: i.insumoId,
      cantidad: i.cantidad,
      insumoNombre: i.insumo?.nombre,
      unidadMedida: i.insumo?.unidadMedida
    }))
  };
  this.modoEdicion = true;
  this.productoEditandoId = producto.id;
  this.calcularPrecio(); 
}


  eliminarProducto(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    this.servicio.deleteProducto(id).subscribe({
      next: () => {
        this.cargarProductos();
        alert('Producto eliminado correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
        alert('Error al eliminar producto');
      }
    });
  }

  removerInsumo(index: number): void {
    this.nuevoProducto.insumos.splice(index, 1);
    this.calcularPrecio();
  }

  getNombreInsumo(id: number): string {
    const insumo = this.insumos.find(i => i.id === id);
    return insumo ? insumo.nombre : 'Insumo no encontrado';
  }

  getUnidadMedida(id: number): string {
    const insumo = this.insumos.find(i => i.id === id);
    return insumo ? insumo.unidadMedida : '';
  }

  resetearFormulario(): void {
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      insumos: []
    };
    this.nuevoInsumoProducto = { insumoId: 0, cantidad: 1 };
    this.modoEdicion = false;
    this.productoEditandoId = null;
    this.precioCalculado = 0;
  }
}
