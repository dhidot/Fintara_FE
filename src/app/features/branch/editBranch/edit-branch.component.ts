import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../../core/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BranchFormComponent } from '../../../shared/components/branch-form/branch-form.component';
import Swal from 'sweetalert2';  // <-- Import SweetAlert

@Component({
  selector: 'app-edit-branch',
  standalone: true,
  imports: [CommonModule, BranchFormComponent],
  template: `
    <app-branch-form
      [branch]="branch"
      [isLoading]="isLoading"
      [title]="'Edit Cabang'"
      [submitButtonText]="'Simpan Perubahan'"
      (formSubmit)="onSubmit()"
    ></app-branch-form>
  `
})
export class EditBranchComponent implements OnInit {
  branchId: string = '';
  branch: any = {
    name: '',
    address: '',
    latitude: null,
    longitude: null
  };
  isLoading: boolean = false;

  constructor(
    private branchService: BranchService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.branchId = this.route.snapshot.paramMap.get('id') || '';
    this.loadBranchData();
  }

  loadBranchData(): void {
    this.branchService.getBranchById(this.branchId).subscribe({
      next: (branch) => {
        this.branch = branch;
      },
      error: () => this.toastr.error('Gagal memuat data branch.')
    });
  }

  onSubmit(): void {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data cabang akan diperbarui.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, perbarui',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.branchService.updateBranch(this.branchId, this.branch).subscribe({
          next: () => {
            this.toastr.success('Cabang berhasil diperbarui');
            this.router.navigate(['/branches']);
          },
          error: (err) => {
            console.error('Error:', err);
            this.toastr.error('Gagal memperbarui cabang');
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      }
    });
  }
}
