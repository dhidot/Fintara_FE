import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-request-disburse',
  standalone: true,
  imports: [LoadingComponent, CommonModule, FormsModule, NgxDatatableModule],
  templateUrl: './loan-request-back-office.component.html',
  styleUrls: ['./loan-request-back-office.component.css']
})
export class LoanRequestBackOfficeComponent implements OnInit {
  loanRequests: LoanRequestApprovalDTO[] = [];
  filteredLoanRequests: LoanRequestApprovalDTO[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(
    private loanRequestService: LoanRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchLoanRequests();
  }

  fetchLoanRequests(): void {
    this.isLoading = true;
    this.loanRequestService.getLoanRequestsForBackOffice().subscribe({
      next: (data) => {
        this.loanRequests = data;
        this.filteredLoanRequests = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching loan requests:', error);
        this.isLoading = false;
      }
    });
  }

  filterRequests(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredLoanRequests = this.loanRequests.filter((req) =>
      req.customerName?.toLowerCase().includes(term) ||
      req.status?.toLowerCase().includes(term)
    );
  }

  viewDetails(loanRequestId: string): void {
    this.router.navigate([`/loan-request/back-office/${loanRequestId}`]); // Navigate to details page
  }
}
