import { Routes } from '@angular/router';
import { LoginComponent } from '../app/features/auth/login/login.component';  // Pastikan path ke komponen login benar
import { ShellComponent } from './layout/shell/shell.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ListPegawaiComponent } from './features/pegawai/getAllPegawai/pegawai-list.component'; // Pastikan path ke komponen list pegawai benar
import { featureGuard } from './core/guards/feature.guard';
import { EditPegawaiComponent } from './features/pegawai/editPegawai/edit-pegawai.component'; // Pastikan path ke komponen edit pegawai benar
import { RegisterPegawaiComponent } from './features/pegawai/registerPegawai/register-pegawai.component'; // Pastikan path ke komponen register pegawai benar

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => LoginComponent },
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent }, // ubah dari '' jadi 'dashboard'
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'pegawai', component: ListPegawaiComponent, canActivate: [featureGuard('FEATURE_EMPLOYEE_ACCESS')], },
      { path: 'pegawai/edit/:id', component: EditPegawaiComponent },
      {
        path: 'pegawai/register',
        component: RegisterPegawaiComponent,
        canActivate: [featureGuard('FEATURE_EMPLOYEE_ACCESS')]
      },
    ]
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  }
];
