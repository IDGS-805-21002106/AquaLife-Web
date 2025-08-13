import { Component, OnInit } from '@angular/core';
import { AquaService } from '../../services/aqua.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-gestion-valoraciones',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './gestion-valoraciones.component.html',
  styleUrl: './gestion-valoraciones.component.css'
})
export class GestionValoracionesComponent implements OnInit {

  valoracionesPendientes: any[] = [];

  constructor(private servicio: AquaService) {}

  ngOnInit() {
    this.cargarPendientes();
  }

  cargarPendientes() {
    this.servicio.getValoracionesPendientes().subscribe({
      next: data => this.valoracionesPendientes = data,
      error: () => alert('Error al cargar valoraciones pendientes')
    });
  }

  aprobar(id: number) {
    this.servicio.aprobarValoracion(id).subscribe({
      next: () => {
        alert('Valoración aprobada');
        this.cargarPendientes();
      },
      error: () => alert('Error al aprobar valoración')
    });
  }

  eliminar(id: number) {
    this.servicio.deleteValoracion(id).subscribe({
      next: () => {
        alert('Valoración eliminada');
        this.cargarPendientes();
      },
      error: () => alert('Error al eliminar valoración')
    });
  }
}
