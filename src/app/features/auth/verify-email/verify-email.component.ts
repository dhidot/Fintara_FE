import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  imports: [CommonModule]
})
export class VerifyEmailComponent implements OnInit {
  status: 'success' | 'error' | null = null;
  message: string = '';
  countdown: number = 5;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Contoh simulasi sukses (kamu bisa ganti dengan real API call)
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.authService.verifyEmail(token).subscribe({
        next: () => {
          this.status = 'success';
          this.message = 'Email kamu berhasil diverifikasi!';
          this.startCountdown();
        },
        error: () => {
          this.status = 'error';
          this.message = 'Token verifikasi tidak valid atau sudah kedaluwarsa.';
        }
      });
    } else {
      this.status = 'error';
      this.message = 'Token verifikasi tidak ditemukan.';
    }
  }

  startCountdown(): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.router.navigate(['/login']);
      }
    }, 1000);
  }
}
