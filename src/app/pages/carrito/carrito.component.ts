import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AquaService } from '../../services/aqua.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NgIf,NgFor, FooterComponent ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  cotizaciones: any[] = [];

  constructor(private servicio: AquaService) {}

  ngOnInit(): void {
    this.cargarCotizaciones();
  }

  cargarCotizaciones() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (!usuario.id) {
      alert('Usuario no válido');
      return;
    }

    this.servicio.getCotizacionesPorUsuario(usuario.id).subscribe({
      next: (data) => this.cotizaciones = data,
      error: () => alert('Error al cargar cotizaciones')
    });
  }
}
