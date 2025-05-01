import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggingOut = false;
  user: any = null;
  @Output() toggle = new EventEmitter<void>();


  constructor(private authService: AuthService, private router: Router) {}

  onToggleSidebar() {
    this.toggle.emit();
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

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
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.isLoggingOut = false;
  }

  goToProfile(): void {
      this.router.navigate(['/pegawai/profile']);
  }

}
