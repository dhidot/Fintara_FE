import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const email = this.form.value.email;

    this.authService.sendResetPasswordEmail(email).subscribe({
      next: () => {
        this.toastr.success('Link reset password telah dikirim ke email Anda.', 'Berhasil', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        this.form.reset();
      },
      error: (error) => {
        const msg = error?.error?.message || 'Terjadi kesalahan.';
        this.toastr.error(msg, 'Gagal', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        this.isLoading = false;
      }
    });
  }
}
