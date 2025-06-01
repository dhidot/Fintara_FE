import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlafondService } from '../../../core/services/plafond.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-plafond',
  templateUrl: './edit-plafond.component.html',
  styleUrls: ['./edit-plafond.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EditPlafondComponent implements OnInit {
  plafondId: string = '';
  isLoading = false;
  plafond: any = {
    name: '',
    maxAmount: 0,
    interestRate: 0,
    minTenor: 0,
    maxTenor: 0
  };

  constructor(
    private route: ActivatedRoute,
    private plafondService: PlafondService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.plafondId = this.route.snapshot.paramMap.get('id') || '';
    this.loadPlafond();
  }

  loadPlafond(): void {
    this.plafondService.getPlafondById(this.plafondId).subscribe({
      next: (data) => {
        this.plafond = data;
      },
      error: () => {
        this.toastr.error('Gagal memuat data plafond');
        this.router.navigate(['/plafond']);
      }
    });
  }

  onSubmit(): void {
  Swal.fire({
    title: 'Konfirmasi',
    text: 'Apakah Anda yakin ingin memperbarui data plafond ini?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, perbarui',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      this.isLoading = true;
      this.plafondService.updatePlafond(this.plafondId, this.plafond).subscribe({
        next: () => {
          this.toastr.success('Plafond berhasil diperbarui');
          this.router.navigate(['/plafonds']);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Gagal memperbarui plafond';
          this.toastr.error(errorMessage, 'Error');
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
