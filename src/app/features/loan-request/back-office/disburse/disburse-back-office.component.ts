import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';
import { LoanReviewDTO } from 'src/app/core/models/loan-review.dto';
import { ToastrService } from 'ngx-toastr';
import { LoanRequestReviewComponent } from 'src/app/shared/components/loan-request-review/loan-request-review.component';

@Component({
  selector: 'app-loan-request-detail',
  standalone: true,
  imports: [LoanRequestReviewComponent],
  template: `<app-loan-request-review
  [loanRequest]="loanRequest"
  [isLoading]="isLoading"
  [isSubmitting]="isSubmitting"
  [role]="'BACKOFFICE'"
  (reviewSubmitted)="disburse($event)" />`
})
export class LoanRequestDisburseComponent implements OnInit {
  loanRequest!: LoanRequestApprovalDTO;
  isLoading = true;
  isSubmitting = false;
  notes: string = '';

  constructor(
    private route: ActivatedRoute,
    private loanRequestService: LoanRequestService,
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
  }

  disburse(event: { status: string; notes: string }): void {
    this.isSubmitting = true;

    const payload: LoanReviewDTO = {
      status: event.status,
      notes: event.notes,
      notesIdentitas: '',
      notesPlafond: '',
      notesSummary: ''
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
