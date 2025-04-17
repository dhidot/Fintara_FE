import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoanRequestListComponent } from 'src/app/shared/components/loan-request-list/loan-request-list.component';

@Component({
  selector: 'app-loan-request',
  standalone: true,
  templateUrl: './loan-request-marketing.component.html',
  styleUrls: ['./loan-request-marketing.component.css'],
  imports: [CommonModule, LoanRequestListComponent],
})
export class LoanRequestMarketingComponent implements OnInit {
  loanRequests: LoanRequestApprovalDTO[] = [];
  isLoading = true;

  constructor(
    private loanRequestService: LoanRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loanRequestService.getLoanRequestsForMarketing().subscribe({
      next: (data) => {
        this.loanRequests = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  handleViewDetail(loanRequestId: string): void {
    this.router.navigate(['/loan-request/marketing', loanRequestId]);
  }
}
