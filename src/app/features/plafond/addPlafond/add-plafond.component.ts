import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlafondService } from '../../../core/services/plafond.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-plafond',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-plafond.component.html'
})
export class AddPlafondComponent {
  plafond = {
    name: '',
    maxAmount: null,
    interestRate: null,
    minTenor: null,
    maxTenor: null
  };

  isLoading = false;

  constructor(
    private plafondService: PlafondService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(): void {
  Swal.fire({
    title: 'Konfirmasi',
    text: 'Apakah Anda yakin ingin menambahkan plafond baru?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, tambah',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      this.isLoading = true;
      this.plafondService.createPlafond(this.plafond).subscribe({
        next: () => {
          this.toastr.success('Plafond berhasil ditambahkan');
          this.router.navigate(['/plafonds']);
        },
        error: () => {
          this.toastr.error('Gagal menambahkan plafond');
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
