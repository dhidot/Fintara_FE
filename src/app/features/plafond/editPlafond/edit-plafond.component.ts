import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlafondService } from '../../../core/services/plafond.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-plafond',
  templateUrl: './edit-plafond.component.html',
  styleUrls: ['./edit-plafond.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EditPlafondComponent implements OnInit {
  plafondId: string = '';
  plafond: any = {
    name: '',
    maxAmount: 0,
    interestRate: 0,
    minTenor: 0,
    maxTenor: 0
  };

  constructor(
    private route: ActivatedRoute,
    private plafondService: PlafondService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.plafondId = this.route.snapshot.paramMap.get('id') || '';
    this.loadPlafond();
  }

  loadPlafond(): void {
    this.plafondService.getPlafondById(this.plafondId).subscribe({
      next: (data) => {
        this.plafond = data;
      },
      error: () => {
        this.toastr.error('Gagal memuat data plafond');
        this.router.navigate(['/plafond']);
      }
    });
  }

  onSubmit(): void {
    this.plafondService.updatePlafond(this.plafondId, this.plafond).subscribe({
      next: () => {
        this.toastr.success('Plafond berhasil diperbarui');
        this.router.navigate(['/plafonds']);
      },
      error: () => {
        this.toastr.error('Gagal memperbarui plafond');
      }
    });
  }
}
