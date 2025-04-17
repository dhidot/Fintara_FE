import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      nip: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = null; // reset pesan error

    const credentials = this.form.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.data.jwt.token);
        localStorage.setItem('features', JSON.stringify(response.data.jwt.features));
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: response.data.jwt.name,
            email: response.data.jwt.username,
            role: response.data.jwt.role
          })
        );

        const isFirstLogin = response.data.firstLogin;
        if (isFirstLogin) {
          // redirect ke ubah password kalau perlu
        }
        this.toastr.success('Login berhasil!', 'Selamat Datang', {
          positionClass: 'toast-bottom-right',
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          enableHtml: true
        });

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const message = err?.error?.message || 'Terjadi kesalahan saat login';

        this.toastr.error(message, 'Login Gagal', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          progressBar: true,
          progressAnimation: 'decreasing',
          enableHtml: true,
        });

        this.isLoading = false;
      }
    });
  }
}
