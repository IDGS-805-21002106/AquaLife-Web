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

  //Usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}usuarios`);
  }

  postUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}usuarios`, data);
  }

  putUsuario(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}usuarios/${id}`, data);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}usuarios/${id}`);
  }

  //Cotizaciones
  getCotizaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}cotizaciones`);
  }

  postCotizacion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}cotizaciones`, data);
  }

  //Productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}productos`);
  }

  postProducto(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}productos`, data);
  }

  //Insumos
  getInsumos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}insumos`);
  }

  postInsumo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}insumos`, data);
  }

  //Proveedores
  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}proveedores`);
  }

  postProveedor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}proveedores`, data);
  }

  //Ventas
  getVentas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}ventas`);
  }

  postVenta(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}ventas`, data);
  }

  //Compras
  getCompras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}compras`);
  }

  postCompra(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}compras`, data);
  }
}
