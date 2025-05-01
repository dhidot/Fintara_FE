import { Component, OnInit, ViewChild } from '@angular/core';
import { PegawaiService } from '../../../core/services/pegawai.service';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { StringUtils } from 'src/app/core/utils/string-utils';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-pegawai-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, RouterLink],
  templateUrl: './pegawai-profile.component.html',
  styleUrls: ['./pegawai-profile.component.css'],
})
export class PegawaiProfileComponent implements OnInit {
  profile: any = null;
  isLoading = true;
  error: string | null = null;
  stringUtils = StringUtils;

  @ViewChild('fileInput', { static: false }) fileInput: any;

  constructor(
    private pegawaiService: PegawaiService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (typeof token === 'string') {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Cek isi dari token yang didecode
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('Token tidak ditemukan atau tidak valid');
    }

    const decoded: any = jwtDecode(token!);
    const userId = decoded.userId;

    this.loadProfile(); // Memuat profil pegawai
  }

  loadProfile(): void {
    this.pegawaiService.getMyProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error('Gagal memuat profil');
        this.isLoading = false;
      },
    });
  }

  // Menangani pemilihan file
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadProfilePhoto(file);
    }
  }

  // Upload foto profil
  uploadProfilePhoto(file: File): void {
    this.isLoading = true;
    this.userService.uploadProfilePhoto(file).subscribe({
      next: (response) => {
        this.profile.fotoUrl = response.fotoUrl; // Update tampilan dengan URL baru
        this.isLoading = false;
        this.toastr.success(response.message); // Pesan dari backend
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.error?.message || 'Gagal mengupload foto profil');
      },
    });
  }

  onEdit(): void {
    this.router.navigate(['/pegawai/edit-profile']);
  }
}
