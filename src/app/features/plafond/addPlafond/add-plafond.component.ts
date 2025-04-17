import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlafondService } from '../../../core/services/plafond.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-plafond',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-plafond.component.html'
})
export class AddPlafondComponent {
  plafond = {
    name: '',
    maxAmount: null,
    interestRate: null,
    minTenor: null,
    maxTenor: null
  };

  isLoading = false;

  constructor(
    private plafondService: PlafondService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.plafondService.createPlafond(this.plafond).subscribe({
      next: () => {
        this.toastr.success('Plafond berhasil ditambahkan');
        this.router.navigate(['/plafonds']);
      },
      error: () => {
        this.toastr.error('Gagal menambahkan plafond');
        this.isLoading = false;
      }
    });
  }
}
