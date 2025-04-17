import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoanReviewDTO } from 'src/app/core/models/loan-review.dto';

@Component({
  selector: 'app-loan-request-bm-review',
  templateUrl: './review-bm.component.html',
  styleUrl: './review-bm.component.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class BmReviewComponent implements OnInit {
  loanRequest!: LoanRequestApprovalDTO;
  isLoading = true;
  reviewForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private loanRequestService: LoanRequestService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.reviewForm = this.fb.group({
      notes: [''],
    });

    this.loanRequestService.getById(id).subscribe({
      next: (data) => {
        this.loanRequest = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toast.error('Gagal mengambil data pengajuan', 'Error');
      },
    });
  }

  review(isApproved: boolean) {
    if (this.reviewForm.invalid) return;

    this.isSubmitting = true;

    const payload: LoanReviewDTO = {
      isApproved,
      notes: this.reviewForm.value.notes,
    };

    this.loanRequestService.reviewLoanRequestByBm(this.loanRequest.id, payload).subscribe({
      next: (response) => {
        this.toast.success(response.message || 'Review berhasil diproses', 'Sukses', {
          positionClass: 'toast-bottom-right',
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          enableHtml: true,
        });

        this.router.navigate(['/loan-request/branch-manager/all']);
      },
      error: (err) => {
        const message = err?.error?.message || 'Terjadi kesalahan saat memproses review';
        this.toast.error(message, 'Gagal', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          progressBar: true,
          progressAnimation: 'decreasing',
          enableHtml: true,
        });
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
