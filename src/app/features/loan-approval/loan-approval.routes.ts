import { featureGuard } from 'src/app/core/guards/feature.guard';
import { Routes } from '@angular/router';
import { LoanApprovalHistoryComponent } from './history/loan-approval-history';
import { FirstLoginGuard } from 'src/app/core/guards/first-login.guard';

export const loanApprovalRoutes: Routes = [
  {
    path: 'loan-approvals/history',
    component: LoanApprovalHistoryComponent,
    canActivate: [FirstLoginGuard, featureGuard('FEATURE_APPROVAL_HISTORY')],
  }
];
