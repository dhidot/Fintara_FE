import { Routes } from '@angular/router';
import { featureGuard } from '../../core/guards/feature.guard';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [featureGuard('FEATURE_DASHBOARD')] },
];
