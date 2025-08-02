import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const expectedRoles: string[] = route.data['expectedRoles'];
  const userRole = this.auth.getUserRole();

  if (!this.auth.isLoggedIn() || !userRole) {
    this.router.navigate(['/login']);
    return false;
  }

  if (userRole === 'Administrador') {
    return true;
  }

  if (!expectedRoles.includes(userRole)) {
    this.router.navigate(['/login']);
    return false;
  }

  return true;
}

}
