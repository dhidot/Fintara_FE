import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoanRequestListComponent } from 'src/app/shared/components/loan-request-list/loan-request-list.component';

@Component({
  selector: 'app-get-all',
  standalone: true,
  imports: [CommonModule, LoanRequestListComponent],
  templateUrl: './loan-request-bm.component.html',
  styleUrl: './loan-request-bm.component.css'
})
export class LoanRequestBmComponent implements OnInit {
  loanRequests: LoanRequestApprovalDTO[] = [];
  isLoading: boolean = true;

  constructor(
    private loanRequestService: LoanRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loanRequestService.getLoanRequestsForBranchManager().subscribe({
      next: (data) => {
        this.loanRequests = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  handleViewDetail(loanRequestId: string): void {
    this.router.navigate(['/loan-request/branch-manager', loanRequestId]);
  }
}
