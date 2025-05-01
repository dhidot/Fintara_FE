import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../../../core/services/branch.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableActionButtonsComponent } from 'src/app/shared/components/table-action-buttons/table-action-buttons.component';

@Component({
  selector: 'app-list-branch',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDatatableModule, RouterModule, LoadingComponent, TableActionButtonsComponent],
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class ListBranchComponent implements OnInit {
  branches: any[] = [];
  filteredBranches: any[] = [];
  searchTerm: string = '';
  isLoading = true;

  constructor(private branchService: BranchService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.isLoading = true;
    this.branchService.getAllBranches().subscribe({
      next: (response) => {
        this.branches = response;
        this.filteredBranches = [...this.branches];
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Gagal memuat data cabang.', 'Error');
        this.isLoading = false;
      }
    });
  }

  onEdit(branch: any): void {
    this.router.navigate(['/branches/edit', branch.id]);
  }

  filterBranches(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredBranches = this.branches.filter(branch =>
      branch.name.toLowerCase().includes(term) ||
      branch.address.toLowerCase().includes(term) ||
      String(branch.latitude).includes(term) ||
      String(branch.longitude).includes(term)
    );
  }
}
