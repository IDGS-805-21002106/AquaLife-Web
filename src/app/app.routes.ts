import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'cotizaciones', component: CotizacionesComponent },
];
