import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoanRequestListComponent } from 'src/app/shared/components/loan-request-list/loan-request-list.component';

@Component({
  selector: 'app-loan-request-back-office-all',
  standalone: true,
  imports: [CommonModule, LoanRequestListComponent],
  template: `
    <app-loan-request-list
      [loanRequests]="loanRequests"
      [isLoading]="isLoading"
      (viewDetails)="onViewDetail($event)">
    </app-loan-request-list>
  `
})
export class LoanRequestBackOfficeComponent implements OnInit {
  loanRequests: LoanRequestApprovalDTO[] = [];
  isLoading = true;

  constructor(
    private loanRequestService: LoanRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loanRequestService.getLoanRequestsForBackOffice().subscribe({
      next: (data) => {
        this.loanRequests = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gagal mengambil daftar pengajuan:', err);
        this.isLoading = false;
      }
    });
  }

  onViewDetail(id: string) {
    this.router.navigate(['/loan-request/back-office', id]);
  }
}
