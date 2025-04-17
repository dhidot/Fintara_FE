import { Component, OnInit } from '@angular/core';
import { PegawaiService } from '../../../core/services/pegawai.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { StringUtils } from 'src/app/core/utils/string-utils';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-pegawai-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingComponent],
  templateUrl: './pegawai-profile.component.html',
  styleUrls: ['./pegawai-profile.component.css'],
})
export class PegawaiProfileComponent implements OnInit {
  profile: any = null;
  isLoading = true;
  error: string | null = null;
  stringUtils = StringUtils;

  constructor(
    private pegawaiService: PegawaiService,
    private toastr: ToastrService,
    private router: Router

  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token'); // Ambil token dari localStorage atau sesi
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
    const decoded: any = jwtDecode(token!); // Decode token
    const userId = decoded.userId; // Ambil userId dari token

    this.loadProfile(); // Panggil method dengan userId
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


  // Bisa menambahkan logika untuk pengeditan profil atau navigasi ke halaman lain jika diperlukan
  onEdit(): void {
    this.router.navigate(['/pegawai/edit-profile']); // Misal ada halaman edit profil
  }
}
