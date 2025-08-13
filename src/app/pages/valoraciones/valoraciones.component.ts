import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor} from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AquaService } from '../../services/aqua.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-valoraciones',
  standalone: true,
  imports: [RouterModule, NgFor, NavbarComponent, FooterComponent, FormsModule, DatePipe],
  templateUrl: './valoraciones.component.html',
  styleUrl: './valoraciones.component.css'
})
export class ValoracionesComponent implements OnInit {

  valoracionesPublicas: any[] = [];
  nuevaValoracion = {
    usuarioId: 0,
    comentario: '',
    calificacion: 5
  };

  constructor(private servicio: AquaService) {}

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario.id) {
      this.nuevaValoracion.usuarioId = usuario.id;
    }
    this.cargarValoraciones();
  }

  cargarValoraciones() {
    this.servicio.getValoracionesPublicas().subscribe({
      next: data => this.valoracionesPublicas = data,
      error: () => alert('Error al cargar valoraciones')
    });
  }

  enviarValoracion() {
  if (!this.nuevaValoracion.usuarioId) {
    alert('Debes iniciar sesión para dejar una valoración');
    return;
  }
  if (!this.nuevaValoracion.comentario.trim()) {
    alert('Debes escribir un comentario');
    return;
  }

  console.log('Enviando valoración:', this.nuevaValoracion);

  this.servicio.postValoracion(this.nuevaValoracion).subscribe({
    next: (res) => {
      console.log('Respuesta del servidor:', res);
      alert('Valoración enviada, pendiente de aprobación');
      this.nuevaValoracion.comentario = '';
      this.cargarValoraciones();
    },
    error: (err) => {
      console.error('Error al enviar valoración:', err);
      alert('Error al enviar valoración');
    }
  });
}

}
