import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DashboardSummary } from '../../core/models/dashboard-summary.dto';
import { DashboardCard } from '../../core/models/dashboard-card.dto';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { DashboardLoanRequestCountDto } from 'src/app/core/models/dashboard-loan-request-to-check';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, LoadingComponent],
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary | null = null;
  loanRequestCount: DashboardLoanRequestCountDto | null = null;
  isLoading = true;
  cards: DashboardCard[] = [];
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

      // Panggil API untuk user biasa
    this.dashboardService.getLoanRequestCount().subscribe({
      next: (count) => {
        console.log('LoanRequestCount:', count);
      this.loanRequestCount = count;
      this.setupCards();
      },
    error: () => {
      this.loanRequestCount = null;
      this.setupCards();
      }
    });

  }

  hasFeature(feature: string): boolean {
    return this.features.includes(feature);
  }

  setupCards(): void {
  if (!this.summary) return;

  const allCards: DashboardCard[] = [
    {
      title: 'Total Role',
      value: this.summary.totalRoles,
      icon: 'bi-shield-lock',
      bgColor: 'card-role',
      feature: 'FEATURE_GET_ALL_ROLE'
    },
    {
      title: 'Total Pegawai',
      value: this.summary.totalPegawai,
      icon: 'bi-person-badge',
      bgColor: 'card-pegawai',
      feature: 'FEATURE_GET_ALL_EMPLOYEE'
    },
    {
      title: 'Total Customer',
      value: this.summary.totalCustomers,
      icon: 'bi-people',
      bgColor: 'card-customer',
      feature: 'FEATURE_GET_ALL_CUSTOMER'
    },
    {
      title: 'Total Cabang',
      value: this.summary.totalBranches,
      icon: 'bi-building',
      bgColor: 'card-cabang',
      feature: 'FEATURE_GET_ALL_BRANCHES'
    },
    {
      title: 'Total Plafond',
      value: this.summary.totalPlafonds,
      icon: 'bi-cash-coin',
      bgColor: 'card-plafond',
      feature: 'FEATURE_GET_ALL_PLAFOND'
    }
  ];

  if (this.loanRequestCount !== null) {
    allCards.push(
      {
        title: 'Pengajuan Perlu Dicek',
        value: this.loanRequestCount.loanRequestsToCheck,
        icon: 'bi-journal-text',
        bgColor: 'bg-primary',
        feature: '' 
      },
      {
        title: 'Pengajuan yang Sudah Dicek',
        value: this.loanRequestCount.loanRequestsCheckedByUser,
        icon: 'bi-check2-circle',
        bgColor: 'bg-success',
        feature: '' 
      }
    );
  }

  this.cards = allCards.filter(card => !card.feature || this.hasFeature(card.feature));
}
}
