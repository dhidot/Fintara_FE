import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanApprovalService } from 'src/app/core/services/loan-approval.service';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';
import { LoanApprovalDTO } from 'src/app/core/models/loan-approval.dto'; // pastikan import model ini
import { LoanReviewDTO } from 'src/app/core/models/loan-review.dto';
import { ToastrService } from 'ngx-toastr';
import { LoanRequestReviewComponent } from '../../../../shared/components/loan-request-review/loan-request-review.component';

@Component({
  selector: 'app-loan-request-detail',
  standalone: true,
  imports: [LoanRequestReviewComponent],
  template: `<app-loan-request-review
    [loanRequest]="loanRequest"
    [previousApprovals]="previousApprovals"
    [isLoading]="isLoading"
    [isSubmitting]="isSubmitting"
    [role]="'BM'"
    (reviewSubmitted)="review($event)" />`
})
export class BmReviewComponent implements OnInit {
  loanRequest!: LoanRequestApprovalDTO;
  previousApprovals: LoanApprovalDTO[] = []; // tambah properti ini
  isLoading = true;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private loanRequestService: LoanRequestService,
    private loanApprovalService: LoanApprovalService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.loanRequestService.getById(id).subscribe({
      next: (data) => {
        this.loanRequest = data;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });

    // Ambil previous approvals juga
    this.loanApprovalService.getApprovalsByLoanRequest(id).subscribe({
      next: (approvals) => {
        console.log('Previous Approvals:', approvals);
        this.previousApprovals = approvals;
      },
      error: () => {
        this.previousApprovals = [];
      }
    });
  }

  review(event: { status: string; notes?: string; notesIdentitas?: string; notesPlafond?: string; notesSummary?: string }) {
    this.isSubmitting = true;

    const payload: LoanReviewDTO = {
      status: event.status,
      notes: event.notes || '', 
      notesIdentitas: event.notesIdentitas || '',
      notesPlafond: event.notesPlafond || '',
      notesSummary: event.notesSummary || ''
    };

    this.loanRequestService.reviewLoanRequestByBm(this.loanRequest.id, payload).subscribe({
      next: (response) => {
        this.toast.success(response.message || 'Review berhasil diproses', 'Sukses');
        this.router.navigate(['/loan-request/branch-manager/all']); // sesuaikan route jika perlu
      },
      error: (err) => {
        const message = err?.error?.message || 'Terjadi kesalahan saat memproses review';
        this.toast.error(message, 'Gagal');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
