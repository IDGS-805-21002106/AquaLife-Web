import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AquaService } from '../../services/aqua.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent, CommonModule, DatePipe],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  valoracionesPublicas: any[] = [];

  constructor(private servicio: AquaService) {}

  ngOnInit(): void {
    this.cargarValoraciones();
  }

  cargarValoraciones() {
    this.servicio.getValoracionesPublicas().subscribe({
      next: (data) => {
        this.valoracionesPublicas = data.slice(0, 3);
      },
      error: () => {
        console.error('Error al cargar valoraciones públicas');
      }
    });
  }
}
