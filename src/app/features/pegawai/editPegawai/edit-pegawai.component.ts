import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PegawaiService } from '../../../core/services/pegawai.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PegawaiDetailsRequestDTO } from '../../../core/models/pegawai-detail-request.dto';
import { BranchService } from '../../../core/services/branch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pegawai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-pegawai.component.html',
  styleUrls: ['./edit-pegawai.component.css']
})
export class EditPegawaiComponent implements OnInit {
  pegawai: any = {};
  branches: any[] = [];
  isLoading = false;
  idPegawai: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pegawaiService: PegawaiService,
    private toastr: ToastrService,
    private branchService: BranchService
  ) {}

  roleOptions = [
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
    { value: 'BRANCH_MANAGER', label: 'Branch Manager' },
    { value: 'BACK_OFFICE', label: 'Back Office' },
    { value: 'MARKETING', label: 'Marketing' },
    { value: 'CUSTOMER', label: 'Customer' }
  ];

  ngOnInit(): void {
    this.idPegawai = this.route.snapshot.paramMap.get('id') || '';
    if (this.idPegawai) {
      this.loadBranches(); // Load branches dulu supaya bisa digunakan saat load pegawai
      this.loadPegawaiDetails(this.idPegawai);
    }
  }

  loadPegawaiDetails(idPegawai: string): void {
    this.pegawaiService.getPegawaiById(idPegawai).subscribe({
      next: (response) => {
        this.pegawai = {
          id: response.id,
          name: response.name,
          email: response.email,
          role: response.role,
          nip: response.pegawaiDetails?.nip || '',
          statusPegawai: response.pegawaiDetails?.statusPegawai || '',
          branchName: response.pegawaiDetails?.branchName || '',
          branchId: ''
        };

        // Set branchId berdasarkan branchName
        const found = this.branches.find(branch => branch.name === this.pegawai.branchName);
        if (found) {
          this.pegawai.branchId = found.id;
        }
      },
      error: () => {
        this.toastr.error('Gagal memuat data pegawai.', 'Error', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      }
    });
  }

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: (response) => {
        this.branches = response;
      },
      error: () => {
        this.toastr.error('Gagal memuat daftar branch.', 'Error', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      }
    });
  }

onSubmit(): void {
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Data pegawai akan diperbarui.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, update',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      this.isLoading = true;
      const request: PegawaiDetailsRequestDTO = {
        nip: this.pegawai.nip,
        branchId: this.pegawai.branchId,
        statusPegawai: this.pegawai.statusPegawai,
        role: { name: this.pegawai.role }
      };

      this.pegawaiService.updatePegawaiDetails(this.idPegawai, request).subscribe({
        next: (response) => {
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/pegawai']);
        },
        error: (error) => {
          this.toastr.error(error.message || 'Gagal memperbarui data pegawai.', 'Error');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  });
}
}
