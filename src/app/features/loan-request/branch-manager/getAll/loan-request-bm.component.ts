import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all',
  standalone: true,
  imports: [LoadingComponent, CommonModule, FormsModule, NgxDatatableModule],
  templateUrl: './loan-request-bm.component.html',
  styleUrl: './loan-request-bm.component.css'
})
export class LoanRequestBmComponent implements OnInit {
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
    this.loanRequestService.getLoanRequestsForBranchManager().subscribe({
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

  goToReview(id: number): void {
    this.router.navigate(['/loan-request/branch-manager', id]); // Pastikan path ini sesuai routing
  }
}
