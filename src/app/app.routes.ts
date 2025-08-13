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
import { RoleGuard } from './guards/role-guard';
import { GestionCotizacionesComponent } from './pages/gestion-cotizaciones/gestion-cotizaciones.component';
import {CarritoComponent} from './pages/carrito/carrito.component';
import {InventarioComponent} from './pages/inventario/inventario.component';
import { GestionValoracionesComponent } from './pages/gestion-valoraciones/gestion-valoraciones.component';


export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'faq', component: FaqComponent },

  { path: 'cotizaciones', component: CotizacionesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Cliente'] } },
  { path: 'perfil', component: PerfilComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Cliente'] } },
  { path: 'valoraciones', component: ValoracionesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Cliente'] } },

  { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'insumos', component: InsumosComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'compras', component: ComprasComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'ventas', component: VentasComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Administrador'] } },
  { path: 'productos', component: ProductosComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Administrador'] } },
  {path: 'gestion-cotizaciones', component: GestionCotizacionesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Administrador'] }},
  {path: 'carrito', component: CarritoComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Cliente'] }},
  {path: 'inventario', component: InventarioComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Administrador'] }},
  {path: 'gestion-valoraciones', component: GestionValoracionesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Administrador'] }},

];

