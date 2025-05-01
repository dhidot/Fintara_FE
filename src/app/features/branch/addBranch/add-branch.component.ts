import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchService } from '../../../core/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BranchFormComponent } from '../../../shared/components/branch-form/branch-form.component'; // 🆕

@Component({
  selector: 'app-branch-add',
  standalone: true,
  imports: [CommonModule, BranchFormComponent],
  template: `
    <app-branch-form
      [branch]="branch"
      [title]="'Tambah Cabang Baru'"
      [submitButtonText]="'Simpan Cabang'"
      (formSubmit)="onSubmit()"
    ></app-branch-form>
  `
})
export class AddBranchComponent {
  branch = {
    name: '',
    address: '',
    latitude: null,
    longitude: null
  };

  constructor(
    private branchService: BranchService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.branchService.addBranch(this.branch).subscribe({
      next: () => {
        this.toastr.success('Cabang berhasil ditambahkan', 'Sukses');
        this.router.navigate(['/branches']);
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Gagal menambahkan cabang';
        this.toastr.error(errorMessage, 'Error');
      }
    });
  }
}
