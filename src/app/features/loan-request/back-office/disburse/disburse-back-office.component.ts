import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestApprovalDTO} from 'src/app/core/models/loan-request-approval.dto';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loan-request-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './disburse-back-office.component.html',
  styleUrls: ['./disburse-back-office.component.css']
})
export class LoanRequestDisburseComponent implements OnInit {
  loanRequest!: LoanRequestApprovalDTO;
  isLoading: boolean = true;
  isError: boolean = false;
  notes: string = '';

  constructor(
    private loanRequestService: LoanRequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const loanRequestId = this.route.snapshot.paramMap.get('id');
    if (loanRequestId) {
      this.fetchLoanRequestDetail(loanRequestId);
    }
  }

  fetchLoanRequestDetail(loanRequestId: string): void {
    this.isLoading = true;
    this.isError = false;
    this.loanRequestService.getById(loanRequestId).subscribe({
      next: (data) => {
        this.loanRequest = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching loan request detail:', error);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  disburse(): void {
    if (!this.loanRequest) return;

    Swal.fire({
      title: 'Konfirmasi Pencairan',
      text: 'Apakah Anda yakin ingin mencairkan dana untuk pengajuan ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Cairkan',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loanRequestService.disburseLoanRequest(this.loanRequest.id, this.notes).subscribe({
          next: () => {
            Swal.fire('Berhasil!', 'Dana berhasil dicairkan.', 'success').then(() => {
              this.goBack();
            });
          },
          error: (err) => {
            Swal.fire('Gagal!', err.error.message || 'Terjadi kesalahan saat mencairkan dana.', 'error');
          }
        });
      }
    });
  }

  // Method to go back to the list of loan requests
  goBack(): void {
    this.router.navigate(['/loan-request/back-office/all']); // Sesuaikan dengan rute daftar loan request Back Office
  }
}
