// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authRoutes } from './features/auth/auth.routes';
import { pegawaiRoutes } from './features/pegawai/pegawai.routes';
import { branchRoutes } from './features/branch/branch.routes';
import { plafondRoutes } from './features/plafond/plafond.routes';
import { customerRoutes } from './features/customer/customer.routes';
import { roleRoutes } from './features/role/role.routes';
import { loanRequestRoutes } from './features/loan-request/loan-request.routes';
import { loanApprovalRoutes } from './features/loan-approval/loan-approval.routes';
import { NotFoundComponent } from './layout/components/not-found/not-found.component';
import { ForbiddenComponent } from './layout/components/forbidden/forbidden.component';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  ...authRoutes,
  {
    path: '',
    component: ShellComponent,
    children: [
      ...dashboardRoutes,
      ...pegawaiRoutes,
      ...customerRoutes,
      ...roleRoutes,
      ...branchRoutes,
      ...plafondRoutes,
      ...loanRequestRoutes,
      ...loanApprovalRoutes,
    ]
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
