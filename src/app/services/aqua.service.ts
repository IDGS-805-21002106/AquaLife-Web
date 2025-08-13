import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AquaService {

  private apiUrl = environment.endPoint;

  constructor(private http: HttpClient) { }


  // Usuarios
 getUsuarios(): Observable<any[]> {
  const token = localStorage.getItem('token');
  return this.http.get<any[]>(`${this.apiUrl}Aqua/ListaUsuarios`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

  postUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Aqua/AgregarUsuario`, data);
  }

  postUsuario2(usuario: any): Observable<any> {
  return this.http.post(`${this.apiUrl}Auth/Registrar`, usuario);
}

  putUsuario(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}Aqua/ModificarUsuario/${id}`, data);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Aqua/EliminarUsuario/${id}`);
  }

  // Cotizaciones
  getCotizaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Aqua/ListaCotizaciones`); 
  }

  postCotizacion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Aqua/AgregarCotizacion`, data); 
  }
  deleteCotizacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Aqua/EliminarCotizacion/${id}`);
  }
  
  putCotizacion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}Aqua/ModificarCotizacion/${id}`, data);
  }

  getCotizacionesPorUsuario(usuarioId: number) {
  return this.http.get<any[]>(`https://localhost:7278/api/Aqua/Usuario/${usuarioId}`);
}

  
  // Productos
 

getProductos(): Observable<any> {
  return this.http.get(`${this.apiUrl}Aqua/ListaProductos`);
}

postProducto(producto: any): Observable<any> {
  return this.http.post(`${this.apiUrl}Aqua/AgregarProducto`, producto, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

putProducto(id: number, producto: any): Observable<any> {
  return this.http.put(`${this.apiUrl}Aqua/ModificarProducto/${id}`, producto, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Aqua/EliminarProducto/${id}`);
  }

  // Insumos
  getInsumos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Aqua/ListaInsumos`);
  }

  postInsumo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Aqua/AgregarInsumo`, data);
  }

  postMovimiento(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Aqua/AgregarMovimiento`, data);
  }

  deleteInsumo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Aqua/EliminarInsumo/${id}`);
  }

  // Proveedores
  getProveedores() {
    return this.http.get<any[]>(`${this.apiUrl}Aqua/ListaProveedores`);
  }

  postProveedor(proveedor: any) {
    return this.http.post(`${this.apiUrl}Aqua/AgregarProveedor`, proveedor);
  }

  putProveedor(id: number, proveedor: any) {
    return this.http.put(`${this.apiUrl}Aqua/ModificarProveedor/${id}`, proveedor);
  }

  deleteProveedor(id: number) {
    return this.http.delete(`${this.apiUrl}Aqua/EliminarProveedor/${id}`);
  }

  // Ventas
  getVentas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}Aqua/ListaVentas`);
}

postVenta(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}Aqua/AgregarVenta`, data);
}

putVenta(id: number, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}Aqua/ModificarVenta/${id}`, data);
}

deleteVenta(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}Aqua/EliminarVenta/${id}`);
}

  // Compras
  getCompras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Aqua/ListaCompras`); 
  }

  postCompra(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Aqua/AgregarCompra`, data); 
  }
  putCompra(id: number, compra: any): Observable<any> {
  return this.http.put(`${this.apiUrl}Aqua/ModificarCompra/${id}`, compra);
  } 

  deleteCompra(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Aqua/EliminarCompra/${id}`);
  }

  // Inventario
getInventario(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}Aqua/ListaInventario`);
}

producirProducto(data: { productoId: number, cantidad: number }): Observable<any> {
  return this.http.post(`${this.apiUrl}Aqua/ProducirProducto`, data);
}

  // Dashboard
getVentasDelMes() {
  return this.http.get<number>(`${this.apiUrl}Aqua/Dashboard/VentasMes`);
}

getGananciasNetas() {
  return this.http.get<number>(`${this.apiUrl}Aqua/Dashboard/GananciasNetas`);
}

getComprasRealizadas() {
  return this.http.get<number>(`${this.apiUrl}Aqua/Dashboard/ComprasRealizadas`);
}

getCotizacionesPendientes() {
  return this.http.get<number>(`${this.apiUrl}Aqua/Dashboard/CotizacionesPendientes`);
}

getProductosEnStock() {
  return this.http.get<number>(`${this.apiUrl}Aqua/Dashboard/ProductosEnStock`);
}

getInsumosBajos() {
  return this.http.get<number>(`${this.apiUrl}Aqua/Dashboard/InsumosBajos`);
}

//login
login(datos: any): Observable<any> {
  return this.http.post(`${this.apiUrl}Auth/Login`, datos);
}


getUsuarioPorCorreo(correo: string) {
  const correoCodificado = encodeURIComponent(correo);
  return this.http.get(`${this.apiUrl}Aqua/ObtenerUsuarioPorCorreo/${correoCodificado}`);
}


// correo cotización
enviarCorreoCotizacion(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}Cotizacion/EnviarCorreoCotizacion`, data);
}

// Valoraciones
getValoracionesPublicas() {
  return this.http.get<any[]>(`${this.apiUrl}Valoraciones/Publicas`);
}



getValoracionesPendientes() {
  return this.http.get<any[]>(`${this.apiUrl}Valoraciones/Pendientes`);
}

postValoracion(valoracion: any) {
  return this.http.post(`${this.apiUrl}Valoraciones`, valoracion, {
    headers: { 'Content-Type': 'application/json' }
  });
}

aprobarValoracion(id: number) {
  return this.http.put(`${this.apiUrl}Valoraciones/Aprobar/${id}`, {});
}

deleteValoracion(id: number) {
  return this.http.delete(`${this.apiUrl}Valoraciones/${id}`);
}


}