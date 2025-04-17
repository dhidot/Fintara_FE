import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DashboardSummary } from '../../core/models/dashboard-summary.dto';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, LoadingComponent],
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary | null = null;
  isLoading = true;
  cards: any[] = [];
  features: string[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.features = JSON.parse(localStorage.getItem('features') || '[]');

    this.dashboardService.getSummary().subscribe({
      next: (data) => {
        this.summary = data;
        this.setupCards();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  hasFeature(feature: string): boolean {
    return this.features.includes(feature);
  }

  setupCards(): void {
    if (!this.summary) return;

    if (this.hasFeature('FEATURE_ROLE_ACCESS')) {
      this.cards.push({
        title: 'Total Role',
        value: this.summary.totalRoles,
        icon: 'bi-shield-lock',
        bgColor: 'bg-primary'
      });
    }

    if (this.hasFeature('FEATURE_GET_ALL_EMPLOYEE_ACCESS')) {
      this.cards.push({
        title: 'Total Pegawai',
        value: this.summary.totalPegawai,
        icon: 'bi-person-badge',
        bgColor: 'bg-success'
      });
    }

    if (this.hasFeature('FEATURE_GET_ALL_CUSTOMER_ACCESS')) {
      this.cards.push({
        title: 'Total Customer',
        value: this.summary.totalCustomers,
        icon: 'bi-people',
        bgColor: 'bg-info'
      });
    }

    if (this.hasFeature('FEATURE_GET_ALL_BRANCHES_ACCESS')) {
      this.cards.push({
        title: 'Total Cabang',
        value: this.summary.totalBranches,
        icon: 'bi-building',
        bgColor: 'bg-warning'
      });
    }

    if (this.hasFeature('FEATURE_PLAFOND_ACCESS')) {
      this.cards.push({
        title: 'Total Plafond',
        value: this.summary.totalPlafonds,
        icon: 'bi-cash-coin',
        bgColor: 'bg-danger'
      });
    }
  }
}
