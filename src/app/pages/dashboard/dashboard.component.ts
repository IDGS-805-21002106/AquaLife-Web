import { Component, OnInit } from '@angular/core';
import { AquaService } from '../../services/aqua.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-dashboard',
  imports:[NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  ventasMes: number = 0;
  gananciasNetas: number = 0;
  comprasRealizadas: number = 0;
  cotizacionesPendientes: number = 0;
  productosEnStock: number = 0;
  insumosBajos: number = 0;

  constructor(private aquaService: AquaService) {}

  ngOnInit() {
    this.aquaService.getVentasDelMes().subscribe(data => this.ventasMes = data);
    this.aquaService.getGananciasNetas().subscribe(data => this.gananciasNetas = data);
    this.aquaService.getComprasRealizadas().subscribe(data => this.comprasRealizadas = data);
    this.aquaService.getCotizacionesPendientes().subscribe(data => this.cotizacionesPendientes = data);
    this.aquaService.getProductosEnStock().subscribe(data => this.productosEnStock = data);
    this.aquaService.getInsumosBajos().subscribe(data => this.insumosBajos = data);
  }
}
