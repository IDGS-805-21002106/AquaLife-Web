import { Component, OnInit } from '@angular/core';
import { AquaService } from '../../services/aqua.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent ],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];
  inventario: any[] = [];

  produccion = {
    productoId: 0,
    cantidad: 1
  };

  constructor(private servicio: AquaService) {}

  ngOnInit(): void {
    this.obtenerInventario();
    this.cargarProductos();
  }

  obtenerInventario() {
    this.servicio.getInventario().subscribe({
      next: (data) => this.inventario = data,
      error: (err) => alert('Error al obtener inventario')
    });
  }

  cargarProductos() {
    this.servicio.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: () => alert('Error al cargar productos')
    });
  }

  producir() {
    if (this.produccion.productoId <= 0 || this.produccion.cantidad <= 0) {
      alert('Debe seleccionar un producto y una cantidad válida.');
      return;
    }

    this.servicio.producirProducto(this.produccion).subscribe({
      next: () => {
        alert('Producto producido con éxito');
        this.obtenerInventario();
        this.produccion = { productoId: 0, cantidad: 1 };
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Error al producir producto');
      }
    });
  }
}
