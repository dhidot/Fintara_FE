import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanApprovalHistory } from '../../../core/models/loan-approval-hitsory.dto';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthService } from '../../../core/services/auth.service';
import { LoanApprovalService } from '../../../core/services/loan-approval.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-loan-approval-history',
  imports: [CommonModule, NgxDatatableModule, FormsModule],
  templateUrl: './loan-approval-history.component.html',
})
export class LoanApprovalHistoryComponent implements OnInit {
  rows: LoanApprovalHistory[] = [];
  filteredRows: LoanApprovalHistory[] = [];
  columns: any[] = [];
  searchTerm: string = '';
  role: string | null = null;
  isLoading = false;

  constructor(private loanApprovalService: LoanApprovalService, private authService: AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    console.log('Role:', this.role);
    this.setColumnsByRole(this.role);
    this.fetchHistory();
  }

  fetchHistory() {
    this.isLoading = true;
    this.loanApprovalService.getLoanApprovalHistory().subscribe((data) => {
      this.rows = data;
      this.filteredRows = data;
      this.isLoading = false;
    });
  }

  filterHistory() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRows = this.rows.filter((row) =>
      row.customerName.toLowerCase().includes(term)
    );
  }

  setColumnsByRole(role: string | null) {
    this.columns = [
      { prop: 'customerName', name: 'Customer' },
      { prop: 'amount', name: 'Jumlah' },
      { prop: 'tenor', name: 'Tenor'},
      { prop: 'statusName', name: 'Status' },
      { prop: 'requestDate', name: 'Tanggal Pengajuan' },
    ];

    if (role === 'MARKETING') {
      this.columns.push({
        prop: 'marketingHandledDate',
        name: 'Diproses Marketing',
      });
    } else if (role === 'BRANCH_MANAGER') {
      this.columns.push({
        prop: 'branchManagerHandledDate',
        name: 'Diproses Branch Manager',
      });
    } else if (role === 'BACK_OFFICE') {
      this.columns.push({
        prop: 'backOfficeHandledDate',
        name: 'Diproses Back Office',
      });
    }
  }
}
