import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';

@Component({
  selector: 'app-loan-request-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDatatableModule],
  templateUrl: './loan-request-list.component.html',
  styleUrls: ['./loan-request-list.component.css']
})
export class LoanRequestListComponent implements OnChanges {
  @Input() loanRequests: LoanRequestApprovalDTO[] = [];
  @Input() isLoading: boolean = false;
  @Output() viewDetails = new EventEmitter<string>();

  searchTerm = '';
  filteredLoanRequests: LoanRequestApprovalDTO[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loanRequests']) {
      this.filteredLoanRequests = [...this.loanRequests];
    }
  }

  filterRequests(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredLoanRequests = this.loanRequests.filter((req) =>
      req.customerName?.toLowerCase().includes(term) ||
      req.status?.toLowerCase().includes(term)
    );
  }

  onViewDetail(id: string): void {
    this.viewDetails.emit(id);
  }
}
