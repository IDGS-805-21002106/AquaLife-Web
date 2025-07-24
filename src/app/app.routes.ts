import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { InsumosComponent } from './pages/insumos/insumos.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ValoracionesComponent } from './pages/valoraciones/valoraciones.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProductosComponent } from './pages/productos/productos.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'cotizaciones', component: CotizacionesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'insumos', component: InsumosComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'valoraciones', component: ValoracionesComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  {path: 'productos', component: ProductosComponent }


];
