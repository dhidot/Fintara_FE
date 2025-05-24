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
      console.log('LOGIN RESPONSE: ', response); // log untuk debug

      const jwt = response.jwt;
      const firstLogin = response.firstLogin;

      if (!jwt || !jwt.token) {
        this.toastr.error('Data login tidak valid.', 'Login Gagal');
        this.isLoading = false;
        return;
      }

      localStorage.setItem('access_token', jwt.token);
      localStorage.setItem('features', JSON.stringify(jwt.features));
      localStorage.setItem('role', jwt.role);
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: jwt.name,
          email: jwt.username,
          role: jwt.role
        })
      );
      localStorage.setItem('first_login', String(firstLogin));

      if (firstLogin) {
        console.log('Redirect ke ubah-password karena firstLogin = true');
        this.router.navigate(['pegawai/change-password']);
      } else {
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

      this.isLoading = false;
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
