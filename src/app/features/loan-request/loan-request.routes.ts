import { Routes } from '@angular/router';
import { LoanRequestMarketingComponent } from './marketing/getAll/loan-request-marketing.component';
import { MarketingReviewComponent } from './marketing/review-marketing/review-marketing.component';
import { LoanRequestBmComponent } from './branch-manager/getAll/loan-request-bm.component';
import { featureGuard } from 'src/app/core/guards/feature.guard';
import { BmReviewComponent } from './branch-manager/review-bm/review-bm.component';
import { LoanRequestBackOfficeComponent } from './back-office/getAll/loan-request-back-office.component';
import { LoanRequestDisburseComponent } from './back-office/disburse/disburse-back-office.component';

export const loanRequestRoutes: Routes = [
  {
    path: 'loan-request/marketing',
    children: [
      {
        path: 'all',
        component: LoanRequestMarketingComponent,
        canActivate: [featureGuard('FEATURE_APPROVAL_MARKETING')],
      },
      {
        path: ':id',
        component: MarketingReviewComponent,
        canActivate: [featureGuard('FEATURE_APPROVAL_MARKETING')],
      },
    ]
  },
  {
    path: 'loan-request/branch-manager',
    children: [
      {
        path: 'all',
        component: LoanRequestBmComponent,
        canActivate: [featureGuard('FEATURE_APPROVAL_BM')],
      },
      {
        path: ':id',
        component: BmReviewComponent,
        canActivate: [featureGuard('FEATURE_APPROVAL_BM')],
      },
    ]
  },
  {
    path: 'loan-request/back-office',
    children: [
      {
        path: 'all',
        component: LoanRequestBackOfficeComponent,
        canActivate: [featureGuard('FEATURE_DISBURSE')],
      },
      {
        path: ':id',
        component: LoanRequestDisburseComponent,
        canActivate: [featureGuard('FEATURE_DISBURSE')],
      },
    ]
  }
];
