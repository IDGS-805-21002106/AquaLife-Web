import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AquaService } from '../../services/aqua.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-gestion-cotizaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './gestion-cotizaciones.component.html',
  styleUrl: './gestion-cotizaciones.component.css'
})

export class GestionCotizacionesComponent implements OnInit {

  cotizaciones: any[] = [];

  constructor(private servicio: AquaService) {}

  ngOnInit(): void {
    this.cargarCotizaciones();
  }

  cargarCotizaciones() {
  this.servicio.getCotizaciones().subscribe({
    next: data => {
      this.cotizaciones = data.filter((c: any) => c.estadoCotizacion === 'Pendiente');
    },
    error: () => alert('Error al obtener cotizaciones')
  });
}

  aprobarCotizacion(cot: any) {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  if (!usuario.nombreCompleto) {
    alert('Usuario no válido. Inicia sesión.');
    return;
  }

  const ventaDTO = {
  nombreCliente: cot.nombre + ' ' + cot.apellidoPaterno,
  fecha: new Date(),
  total: cot.precioFinal,
  detallesVenta: [
    {
      productoId: cot.productoId,  
      cantidad: 1,
      precioUnitario: cot.precioFinal
    }
  ]
};


  console.log('Enviando ventaDTO:', ventaDTO); 

  this.servicio.postVenta(ventaDTO).subscribe({
    next: () => {
      const cotizacionActualizada = {
        ...cot,
        estadoCotizacion: 'aprobada'
      };

      this.servicio.putCotizacion(cot.id, cotizacionActualizada).subscribe({
        next: () => {
          alert('Cotización aprobada y venta registrada');
          this.cargarCotizaciones();
        },
        error: () => alert('Error al actualizar el estado de la cotización')
      });
    },
    error: (error) => {
  console.error('Error al registrar venta:', error);

  if (error.error && typeof error.error === 'string') {
    alert(error.error);
  } else {
    alert('Error al registrar venta');
  }
}
  });
}




  cancelarCotizacion(id: number) {
    this.servicio.deleteCotizacion(id).subscribe({
      next: () => {
        alert('Cotización eliminada');
        this.cargarCotizaciones();
      },
      error: () => alert('Error al eliminar cotización')
    });
  }
}