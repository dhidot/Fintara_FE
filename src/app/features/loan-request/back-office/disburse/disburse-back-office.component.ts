import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';
import { LoanReviewDTO } from 'src/app/core/models/loan-review.dto';
import { ToastrService } from 'ngx-toastr';
import { LoanRequestReviewComponent } from 'src/app/shared/components/loan-request-review/loan-request-review.component';
import { LoanApprovalService } from 'src/app/core/services/loan-approval.service';
import { LoanApprovalDTO } from 'src/app/core/models/loan-approval.dto';

@Component({
  selector: 'app-loan-request-detail',
  standalone: true,
  imports: [LoanRequestReviewComponent],
  template: `<app-loan-request-review
  [loanRequest]="loanRequest"
  [isLoading]="isLoading"
  [isSubmitting]="isSubmitting"
  [previousApprovals]="previousApprovals"
  [role]="'BACKOFFICE'"
  (reviewSubmitted)="disburse($event)" />`
})
export class LoanRequestDisburseComponent implements OnInit {
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
    const loanRequestId = this.route.snapshot.paramMap.get('id');
    if (loanRequestId) {
      this.fetchLoanRequestDetail(loanRequestId);
      }
    }

  fetchLoanRequestDetail(loanRequestId: string): void {
    this.isLoading = true;
    this.loanRequestService.getById(loanRequestId).subscribe({
      next: (data) => {
        this.loanRequest = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });

        // Ambil previous approvals juga
    this.loanApprovalService.getApprovalsByLoanRequest(loanRequestId).subscribe({
      next: (approvals) => {
        console.log('Previous Approvals:', approvals);
        this.previousApprovals = approvals;
      },
      error: () => {
        this.previousApprovals = [];
      }
    });
  }

  disburse(event: { status: string; notes?: string; notesIdentitas?: string; notesPlafond?: string; notesSummary?: string }): void {
    this.isSubmitting = true;

    const payload: LoanReviewDTO = {
      status: event.status,
      notes: event.notes || '',
      notesIdentitas: event.notesIdentitas || '',
      notesPlafond: event.notesPlafond || '',
      notesSummary: event.notesSummary || ''
    };

    this.loanRequestService.disburseLoanRequest(this.loanRequest.id, payload).subscribe({
      next: (response) => {
        this.toast.success(response.message || 'Dana berhasil dicairkan', 'Sukses');
        this.router.navigate(['/loan-request/back-office/all']);
      },
      error: (err) => {
        const message = err?.error?.message || 'Terjadi kesalahan saat mencairkan dana';
        this.toast.error(message, 'Gagal');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
