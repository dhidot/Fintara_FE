import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isLoggingOut = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.isLoggingOut = true;
    this.authService.logout().subscribe({
      next: () => this.finishLogout(),
      error: () => this.finishLogout()
    });
  }

  private finishLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('features');
    this.router.navigate(['/login']);
    this.isLoggingOut = false;
  }
}
