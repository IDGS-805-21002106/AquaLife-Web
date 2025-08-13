import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  get role(): string | null {
    return this.authService.getUserRole();
  }

  ngAfterViewInit() {
    document.querySelectorAll('.offcanvas').forEach(el => {
      el.addEventListener('shown.bs.offcanvas', () => {
        document.body.style.overflow = 'hidden';
      });

      el.addEventListener('hidden.bs.offcanvas', () => {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0px';
        document.body.style.paddingLeft = '0px';
        document.body.classList.remove('offcanvas-backdrop', 'show');
      });
    });
  }
}
