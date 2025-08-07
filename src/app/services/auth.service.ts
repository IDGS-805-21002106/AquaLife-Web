import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsuario(): any {
  const usuarioJson = localStorage.getItem('usuario');
  return usuarioJson ? JSON.parse(usuarioJson) : null;
}

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = token.split('.')[1];
    try {
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload['role'] || parsedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } catch (e) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    localStorage.removeItem('usuario');
  }
}
