import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  imports: [CommonModule, FormsModule]
})
export class VerifyEmailComponent implements OnInit {
  status: 'success' | 'error' | null = null;
  message: string = '';
  countdown: number = 5;
  isLoading = false;
  email: string = '';
  isResending = false;
  resendMessage: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.isLoading = true;
      this.authService.verifyEmail(token).subscribe({
        next: () => {
          this.isLoading = false;
          this.status = 'success';
          this.message = 'Email kamu berhasil diverifikasi!';
          this.startCountdown();
        },
        error: () => {
          this.isLoading = false;
          this.status = 'error';
          this.message = 'Token verifikasi tidak valid atau sudah kadaluwarsa.';
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
        this.router.navigate(['/home']);
      }
    }, 1000);
  }

  resendVerification(): void {
    if (!this.email) {
      this.resendMessage = 'Email tidak boleh kosong.';
      return;
    }

    this.isResending = true;
    this.resendMessage = '';

    this.authService.resendVerificationEmail(this.email).subscribe({
      next: () => {
        this.isResending = false;
        this.resendMessage = 'Email verifikasi berhasil dikirim ulang.';
      },
      error: (err) => {
        this.isResending = false;
        this.resendMessage = err.message || 'Gagal mengirim ulang email verifikasi.';
      }
    });
  }

  isSuccessMessage(message: string): boolean {
    const keywords = ['berhasil', 'terkirim', 'sukses'];
    return keywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  isErrorMessage(message: string): boolean {
    const keywords = ['gagal', 'tidak valid', 'kadaluwarsa', 'kosong'];
    return keywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  isWarningMessage(message: string): boolean {
    const keywords = ['sudah terverifikasi', 'sudah dikirim', 'token'];
    return keywords.some(keyword => message.toLowerCase().includes(keyword));
  }

}
