import { Component, OnInit } from '@angular/core';
import { PegawaiService } from '../../../core/services/pegawai.service'; // Pastikan path ini sesuai dengan struktur folder Anda
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <- tambahkan ini jika nanti mau redirect
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router'; // <- tambahkan ini jika nanti mau redirect
import { FormsModule } from '@angular/forms'; // tambahkan FormsModule

@Component({
  selector: 'app-list-pegawai',
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, FormsModule, RouterLink],
  templateUrl: './pegawai-list.component.html',
  styleUrls: ['./pegawai-list.component.css'],
})
export class ListPegawaiComponent implements OnInit {
  pegawaiList: any[] = [];
  filteredPegawaiList: any[] = [];
  isLoading = false;
  searchTerm = '';

  constructor(private pegawaiService: PegawaiService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.loadPegawai();
  }

  loadPegawai(): void {
    this.isLoading = true;
    this.pegawaiService.getAllPegawai().subscribe({
      next: (response) => {
        this.pegawaiList = response.map((p: any) => ({
          ...p,
          nip: p.pegawaiDetails?.nip ?? '-',
          branchName: p.pegawaiDetails?.branchName ?? '-',
          statusPegawai: p.pegawaiDetails?.statusPegawai ?? '-',
        }));
        this.filteredPegawaiList = [...this.pegawaiList]; // Inisialisasi hasil filter
      },
      error: (error) => {
        this.toastr.error('Gagal memuat data pegawai.', 'Error', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  filterPegawai(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPegawaiList = this.pegawaiList.filter((pegawai) =>
      pegawai.name.toLowerCase().includes(term) ||
      pegawai.nip.toLowerCase().includes(term) ||
      pegawai.email.toLowerCase().includes(term) ||
      pegawai.role.toLowerCase().includes(term) ||
      pegawai.branchName.toLowerCase().includes(term)
    );
  }

  onEdit(row: any): void {
    // edit logic here
    this.router.navigate([`/pegawai/edit/${row.id}`]);
  }
}
