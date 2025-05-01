import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PegawaiService } from '../../../core/services/pegawai.service'; // Sesuaikan path
import { RoleService } from '../../../core/services/role.service'; // Import RoleService
import { BranchService } from '../../../core/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import komponen select field
import { JenisKelamin } from 'src/app/core/enums/jenis-kelamin';
import { StatusPegawai } from 'src/app/core/enums/status-pegawai';

@Component({
  selector: 'app-register-pegawai',
  templateUrl: './register-pegawai.component.html',
  styleUrls: ['./register-pegawai.component.css'],
  imports: [CommonModule, FormsModule],
})
export class RegisterPegawaiComponent {
  pegawai = {
    name: '',
    email: '',
    nip: '',
    role: '',
    jenisKelamin: JenisKelamin.LAKI_LAKI,
    branchName: '',
    statusPegawai: StatusPegawai.ACTIVE, // Gunakan enum di sini
  };

  roleList: any[] = [];
  branchList: any[] = [];
  isLoading = false;

  roleNameMap: { [key: string]: string } = {
    SUPER_ADMIN: 'Super Admin',
    BACK_OFFICE: 'Back Office',
    BRANCH_MANAGER: 'Branch Manager',
    MARKETING: 'Marketing',
    CUSTOMER: 'Customer',
  };

  // Daftar status pegawai
  statusList = [
    { value: StatusPegawai.ACTIVE, label: 'Active' },
    { value: StatusPegawai.CDT, label: 'CDT' },
    { value: StatusPegawai.CUTI, label: 'Cuti' },
    { value: StatusPegawai.RESIGN, label: 'Resign' },
  ];

  genderList = [
    { value: JenisKelamin.LAKI_LAKI, label: 'Laki-laki' },
    { value: JenisKelamin.PEREMPUAN, label: 'Perempuan' },
  ];

  constructor(
    private pegawaiService: PegawaiService,
    private roleService: RoleService,   // Menambahkan RoleService
    private branchService: BranchService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.statusList);
    this.loadRoles();
    this.loadBranches();
  }

    // Fungsi untuk mengambil daftar roles dari backend
    loadRoles(): void {
      this.roleService.getAllRoles().subscribe({
        next: (response) => {
          console.log('Response Roles:', response);
          this.roleList = response;
        },
        error: (error) => {
          this.toastr.error('Gagal mengambil daftar role.', 'Error', {
            positionClass: 'toast-bottom-right',
            progressBar: true,
          });
        },
      });
    }

    // Fungsi untuk mengambil daftar branches dari backend
    loadBranches(): void {
      this.branchService.getAllBranches().subscribe({
        next: (response) => {
          this.branchList = response;
        },
        error: (error) => {
          this.toastr.error('Gagal mengambil daftar cabang.', 'Error', {
            positionClass: 'toast-bottom-right',
            progressBar: true,
          });
        },
      });
    }

    onSubmit(): void {
      // Pastikan statusPegawai memiliki nilai yang sesuai dengan enum sebelum dikirim
      if (this.pegawai.statusPegawai) {
        this.isLoading = true;
        this.pegawaiService.registerPegawai(this.pegawai).subscribe({
          next: (response) => {
            this.toastr.success('Pegawai berhasil didaftarkan!', 'Success', {
              positionClass: 'toast-bottom-right',
              progressBar: true,
            });
            this.router.navigate(['/pegawai']);
          },
          error: (error) => {
            console.error('Error response:', error);  // Debug log untuk melihat seluruh respons error

            // Jika ada pesan error dari backend, tampilkan masing-masing error
            if (error?.error) {
              for (const [field, message] of Object.entries(error.error)) {
                // Pastikan message bertipe string
                if (typeof message === 'string') {
                  this.toastr.warning(message, `Error pada field ${field}`, {
                    positionClass: 'toast-bottom-right',
                    progressBar: true,
                  });
                }
              }
            } else {
              this.toastr.error(error?.error?.message || 'Gagal mendaftarkan pegawai', 'Error', {
                positionClass: 'toast-bottom-right',
                progressBar: true,
              });
            }
            this.isLoading = false;
          }
        });
      } else {
        this.toastr.error('Status Pegawai tidak valid.', 'Error', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
      }
    }
}
