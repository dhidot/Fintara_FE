import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchService } from '../../../core/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent {
  branch = {
    name: '',
    address: '',
    latitude: null,
    longitude: null
  };

  constructor(
    private branchService: BranchService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.branchService.addBranch(this.branch).subscribe({
      next: () => {
        this.toastr.success('Cabang berhasil ditambahkan', 'Sukses');
        this.router.navigate(['/branches']);
      },
      error: () => {
        this.toastr.error('Gagal menambahkan cabang', 'Error');
      }
    });
  }
}
