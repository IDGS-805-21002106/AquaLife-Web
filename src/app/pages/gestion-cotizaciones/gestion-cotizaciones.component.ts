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

  this.servicio.postVenta(ventaDTO).subscribe({
    next: () => {
      const cotizacionActualizada = {
        ...cot,
        estadoCotizacion: 'aprobada'
      };

      this.servicio.putCotizacion(cot.id, cotizacionActualizada).subscribe({
        next: () => {
          this.servicio.enviarCorreoCotizacion({
            para: cot.correo,
            asunto: 'Cotización aprobada - AquaLife',
            cuerpo: `<h3>Hola ${cot.nombre}</h3><p>Tu cotización para el producto <strong>${cot.productoNombre}</strong> ha sido aprobada.</p><p>Precio final: <strong>$${cot.precioFinal}</strong></p><p>¡Gracias por confiar en nosotros!</p>`
          }).subscribe({
            next: () => console.log('Correo de aprobación enviado'),
            error: () => console.error('Error al enviar correo de aprobación')
          });

          alert('Cotización aprobada y venta registrada');
          this.cargarCotizaciones();
        },
        error: () => alert('Error al actualizar el estado de la cotización')
      });
    },
    error: (error) => {
      console.error('Error al registrar venta:', error);
      alert(error.error && typeof error.error === 'string' ? error.error : 'Error al registrar venta');
    }
  });
}





  cancelarCotizacion(id: number) {
  const cot = this.cotizaciones.find(c => c.id === id);
  if (!cot) return;

  this.servicio.deleteCotizacion(id).subscribe({
    next: () => {
      this.servicio.enviarCorreoCotizacion({
        para: cot.correo,
        asunto: 'Cotización cancelada - AquaLife',
        cuerpo: `<h3>Hola ${cot.nombre}</h3><p>Lamentamos informarte que tu cotización para el producto <strong>${cot.productoNombre}</strong> ha sido cancelada.</p>`
      }).subscribe({
        next: () => console.log('Correo de cancelación enviado'),
        error: () => console.error('Error al enviar correo de cancelación')
      });

      alert('Cotización eliminada');
      this.cargarCotizaciones();
    },
    error: () => alert('Error al eliminar cotización')
  });
}

}