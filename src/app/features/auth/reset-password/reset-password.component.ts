import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';  // Pastikan pathnya benar
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthWrapperComponent } from '../auth-wrapper.component'; // Pastikan pathnya benar

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AuthWrapperComponent],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  token: string | null = null;
  showNewPassword = false;
showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const { newPassword, confirmPassword } = this.form.value;

    this.authService.resetPassword(this.token!, newPassword, confirmPassword).subscribe({
      next: () => {
        this.toastr.success('Password berhasil diubah.', 'Berhasil', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        this.router.navigate(['/login']);
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
      },
    });
  }

  // Helper untuk memudahkan di template
  get newPassword() {
    return this.form.get('newPassword');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
