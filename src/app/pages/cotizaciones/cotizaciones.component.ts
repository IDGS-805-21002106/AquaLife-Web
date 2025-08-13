import { Component, OnInit } from '@angular/core';
import { AquaService } from '../../services/aqua.service';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

declare var bootstrap: any;

@Component({
  selector: 'app-cotizaciones',
  standalone: true,
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.css',
  imports: [
    FormsModule,
    DecimalPipe,
    NgIf,
    NgFor,
    NavbarComponent,
    RouterModule,
    FooterComponent
  ]
})
export class CotizacionesComponent implements OnInit {

  cotizacion = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    telefono: '',
    estado: '',
    ciudad: '',
    comentarios: ''
  };

  productos: any[] = [];
  productoSeleccionadoId: number = 0; 
  precioCalculado: number = 0;

  constructor(private servicio: AquaService) {}

  ngOnInit() {
    this.servicio.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: () => alert('Error al cargar productos')
    });

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario?.correo) {
      this.cotizacion.correo = usuario.correo;
    }
  }

  mostrarModal() {
    const producto = this.productos.find(p => p.id === Number(this.productoSeleccionadoId));
    if (!producto) {
      alert("Selecciona un producto válido");
      return;
    }

    this.precioCalculado = +(producto.precio * 1.30).toFixed(2);
    const modal = new bootstrap.Modal(document.getElementById('modalPrecio'));
    modal.show();
  }

  enviarCotizacion() {
    const producto = this.productos.find(p => p.id === Number(this.productoSeleccionadoId));
    if (!producto) return;

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (!usuario.id) {
      alert('Debes iniciar sesión para enviar una cotización');
      return;
    }

    const nuevaCotizacion = {
      nombre: this.cotizacion.nombre,
      apellidoPaterno: this.cotizacion.apellidoPaterno,
      apellidoMaterno: this.cotizacion.apellidoMaterno,
      correo: usuario.correo, 
      telefono: this.cotizacion.telefono,
      estado: this.cotizacion.estado,
      ciudad: this.cotizacion.ciudad,
      productoNombre: producto.nombre,
      precioFinal: this.precioCalculado,
      estadoCotizacion: "Pendiente",
      productoId: producto.id,
      usuarioId: usuario.id 
    };

    this.servicio.postCotizacion(nuevaCotizacion).subscribe({
      next: () => {
        alert('Cotización enviada con éxito');
        this.limpiarFormulario();
        this.cotizacion.correo = usuario.correo;
      },
      error: (error) => {
        console.error('Error al enviar la cotización:', error);
        alert('Error al enviar la cotización');
      }
    });
  }

  limpiarFormulario() {
    this.cotizacion = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correo: '', 
      telefono: '',
      estado: '',
      ciudad: '',
      comentarios: ''
    };
    this.productoSeleccionadoId = 0;
    this.precioCalculado = 0;
  }
}
