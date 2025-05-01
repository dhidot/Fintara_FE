import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { AuthWrapperComponent } from '../auth-wrapper.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule, AuthWrapperComponent],
  templateUrl: './login.component.html',
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
        localStorage.setItem('role', response.data.jwt.role);
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: response.data.jwt.name,
            email: response.data.jwt.username,
            role: response.data.jwt.role
          })
        );
        localStorage.setItem('first_login', response.data.firstLogin); // Menyimpan status firstLogin ke localStorage

        const isFirstLogin = response.data.firstLogin; // Menangkap status firstLogin
        if (isFirstLogin) {
          // Redirect ke halaman ubah password jika firstLogin = true
          console.log('Redirect ke ubah-password karena firstLogin = true');
          this.router.navigate(['pegawai/change-password']);
        } else {
          // Jika bukan first login, arahkan ke dashboard
          console.log('Redirect ke dashboard karena firstLogin = false');
          this.router.navigate(['/dashboard']);
        }

        this.toastr.success('Login berhasil!', 'Selamat Datang', {
          positionClass: 'toast-bottom-right',
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          enableHtml: true
        });
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
