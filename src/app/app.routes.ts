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


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  ...authRoutes,
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      ...pegawaiRoutes,
      ...customerRoutes,
      ...roleRoutes,
      ...branchRoutes,
      ...plafondRoutes,
      ...loanRequestRoutes,
    ]
  }
];
