// src/app/features/pegawai/pegawai.routes.ts
import { Routes } from '@angular/router';
import { ListPegawaiComponent } from './getAllPegawai/pegawai-list.component';
import { RegisterPegawaiComponent } from './registerPegawai/register-pegawai.component';
import { EditPegawaiComponent } from './editPegawai/edit-pegawai.component';
import { PegawaiProfileComponent } from './profilePegawai/pegawai-profile.component';
import { featureGuard } from 'src/app/core/guards/feature.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FirstLoginGuard } from 'src/app/core/guards/first-login.guard';

export const pegawaiRoutes: Routes = [
  { path: 'pegawai', component: ListPegawaiComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_GET_ALL_EMPLOYEE')] },
  { path: 'pegawai/register', component: RegisterPegawaiComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_ADD_EMPLOYEE')] },
  { path: 'pegawai/edit/:id', component: EditPegawaiComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_UPDATE_EMPLOYEE_PROFILE')] },
  { path: 'pegawai/profile', component: PegawaiProfileComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_PROFILE_EMPLOYEE')] },
  { path: 'pegawai/change-password', component: ChangePasswordComponent, canActivate: [featureGuard('FEATURE_CHANGE_PASSWORD_EMPLOYEE')] },
];
