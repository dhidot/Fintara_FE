import { Component, OnInit } from '@angular/core';
import { PlafondService } from '../../../core/services/plafond.service';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-plafond',
  templateUrl: './plafond-list.component.html',
  styleUrls: ['./plafond-list.component.css'],
  standalone: true,
  imports: [LoadingComponent, CommonModule]
})
export class ListPlafondComponent implements OnInit {
  plafonds: any[] = [];
  isLoading = true;

  constructor(private plafondService: PlafondService, private router: Router) {}

  ngOnInit(): void {
    this.loadPlafonds();
  }

  loadPlafonds(): void {
    this.plafondService.getAllPlafonds().subscribe({
      next: (data) => {
        this.plafonds = data;
        this.isLoading = false;
      },
      error: () => console.error('Gagal memuat data plafond.')
    });
  }

  goToAddPlafond(): void {
    this.router.navigate(['/plafonds/add']);
  }

  editPlafond(plafond: any): void {
    this.router.navigate(['/plafonds/edit', plafond.id]);
  }

  goToEdit(name: string) {
    this.router.navigate(['/plafonds/edit', name]);
  }

  getCardClass(name: string): string {
    switch (name.toLowerCase()) {
      case 'bronze':
        return 'bg-bronze text-white';
      case 'silver':
        return 'bg-silver text-white';
      case 'gold':
        return 'bg-gold text-white';
      case 'platinum':
        return 'bg-platinum text-white';
      default:
        return 'bg-secondary text-white';
    }
  }

  getIconClass(name: string): string {
    switch (name.toLowerCase()) {
      case 'bronze':
        return 'bi bi-star-fill';
      case 'silver':
        return 'bi bi-gem';
      case 'gold':
        return 'bi bi-trophy-fill';
      case 'platinum':
        return 'bi bi-award-fill';
      default:
        return 'bi bi-cash';
    }
  }
}
