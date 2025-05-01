import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PegawaiService } from 'src/app/core/services/pegawai.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private pegawaiService: PegawaiService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;

    const { oldPassword, newPassword, confirmNewPassword } = this.form.value;

    this.pegawaiService.changePassword({ oldPassword, newPassword, confirmNewPassword }).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'Password berhasil diubah!', 'Sukses', {
          positionClass: 'toast-bottom-right',
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          enableHtml: true
        });

        localStorage.setItem('first_login', 'false');
        this.form.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const message = err?.error?.message || 'Gagal mengubah password';
        this.toastr.error(message, 'Gagal', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          progressBar: true,
          progressAnimation: 'decreasing',
          enableHtml: true
        });

        this.isLoading = false;
      }
    });
  }
}
