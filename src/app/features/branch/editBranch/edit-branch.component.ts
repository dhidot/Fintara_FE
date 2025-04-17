import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../../core/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  imports: [CommonModule, FormsModule],
})
export class EditBranchComponent implements OnInit {
  branchId: string = '';
  branch: any = {
    name: '',
    address: '',
    latitude: null,
    longitude: null
  };
  isLoading: boolean = false; // State untuk menandakan proses loading

  constructor(
    private branchService: BranchService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.branchId = this.route.snapshot.paramMap.get('id') || '';
    this.loadBranchData(); // Memuat data branch berdasarkan branchId
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
    this.isLoading = true; // Mengatur state menjadi loading saat submit
    this.branchService.updateBranch(this.branchId, this.branch).subscribe({
      next: () => {
        this.toastr.success('Branch berhasil diperbarui');
        this.router.navigate(['/branches']); // Arahkan ke halaman daftar branch setelah sukses
      },
      error: (err) => {
        console.error('Error:', err);
        this.toastr.error('Gagal memperbarui branch');
      },
      complete: () => {
        this.isLoading = false; // Set loading ke false setelah proses selesai
      }
    });
  }
}
