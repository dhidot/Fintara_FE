import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';  // Pastikan pathnya benar
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Ambil token dari URL
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit() {
    if (this.form.invalid || this.form.value.newPassword !== this.form.value.confirmPassword) {
      return;
    }

    this.isLoading = true;
    const { newPassword } = this.form.value;

    // Panggil API reset password dengan token dan password baru
    this.authService.resetPassword(this.token!, newPassword).subscribe({
      next: () => {
        this.toastr.success('Password berhasil diubah.', 'Berhasil', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        this.router.navigate(['/login']);  // Arahkan ke halaman login setelah sukses
      },
      error: (error) => {
        const msg = error?.error?.message || 'Terjadi kesalahan.';
        this.toastr.error(msg, 'Gagal', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
