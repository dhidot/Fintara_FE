import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Pastikan ini diimpor
import { CommonModule } from '@angular/common'; // Tambahkan CommonModule di sini
import { PegawaiService } from '../../../core/services/pegawai.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PegawaiDetailsRequestDTO } from '../../../core/models/pegawai-detail-request.dto';
import { BranchService } from '../../../core/services/branch.service';  // Import service untuk branch

@Component({
  selector: 'app-edit-pegawai',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Tambahkan CommonModule di sini
  templateUrl: './edit-pegawai.component.html',
  styleUrls: ['./edit-pegawai.component.css']
})
export class EditPegawaiComponent implements OnInit {
  pegawai: any = {};
  branches: any[] = []; // Daftar branches
  isLoading = false;
  idPegawai: string = '';
  selectedBranchId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pegawaiService: PegawaiService,
    private toastr: ToastrService,
    private branchService: BranchService // Inject service untuk branch
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
      this.loadPegawaiDetails(this.idPegawai);
      this.loadBranches();  // Ambil daftar branches
    }
  }

  loadPegawaiDetails(idPegawai: string): void {
    this.isLoading = true;
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
          branchId: '' // default, akan diisi nanti lewat matching
        };

        // Optional: kalau kamu juga dapat daftar branch dan ingin preselect berdasarkan branchName
        const found = this.branches.find(branch => branch.name === this.pegawai.branchName);
        if (found) {
          this.pegawai.branchId = found.id;
        }
      },
      error: (error) => {
        this.toastr.error('Gagal memuat data pegawai.', 'Error', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loadBranches(): void {
    this.isLoading = true;
    this.branchService.getAllBranches().subscribe({
      next: (response) => {
        console.log('Branches data:', response);  // Menampilkan data di console untuk debugging
        this.branches = response;
      },
      error: (error) => {
        console.error('Error fetching branches:', error);  // Log error untuk debugging
        this.toastr.error('Gagal memuat daftar branch.', 'Error', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
}


  onSubmit(): void {
    this.isLoading = true;
    const request: PegawaiDetailsRequestDTO = {
      nip: this.pegawai.nip,
      branchId: this.pegawai.branchId,
      statusPegawai: this.pegawai.statusPegawai,
      role: this.pegawai.role
    };

    this.pegawaiService.updatePegawaiDetails(this.idPegawai, request).subscribe({
      next: () => {
        this.toastr.success('Data pegawai berhasil diperbarui.', 'Success', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
        this.router.navigate(['/pegawai']);
      },
      error: (error) => {
        this.toastr.error('Gagal memperbarui data pegawai.', 'Error', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
