import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AquaService } from '../../services/aqua.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-cotizaciones',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.css'
})
export class CotizacionesComponent {

  cotizacion = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    telefono: '',
    areaM2: 0,
    estado: '',
    ciudad: '',
    comentarios: ''
  };

  constructor(private servicio: AquaService) {}

  enviarCotizacion() {
    const nuevaCotizacion = {
      ...this.cotizacion,
      fecha: new Date() 
    };

    this.servicio.postCotizacion(nuevaCotizacion).subscribe({
      next: () => {
        alert('Cotización enviada con éxito');
        this.limpiarFormulario();
      },
      error: () => {
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
      areaM2: 0,
      estado: '',
      ciudad: '',
      comentarios: ''
    };
  }
}
