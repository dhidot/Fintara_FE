// src/app/features/pegawai/pegawai.routes.ts
import { Routes } from '@angular/router';
import { ListPegawaiComponent } from './getAllPegawai/pegawai-list.component';
import { EditPegawaiComponent } from './editPegawai/edit-pegawai.component';
import { RegisterPegawaiComponent } from './registerPegawai/register-pegawai.component';
import { PegawaiProfileComponent } from './profilePegawai/pegawai-profile.component';
import { featureGuard } from 'src/app/core/guards/feature.guard';

export const pegawaiRoutes: Routes = [
  { path: 'pegawai', component: ListPegawaiComponent, canActivate: [featureGuard('FEATURE_GET_ALL_EMPLOYEE_ACCESS')] },
  { path: 'pegawai/edit/:id', component: EditPegawaiComponent },
  { path: 'pegawai/register', component: RegisterPegawaiComponent, canActivate: [featureGuard('FEATURE_ADD_EMPLOYEE_ACCESS')] },
  { path: 'profile', component: PegawaiProfileComponent, canActivate: [featureGuard('FEATURE_PROFILE_EMPLOYEE_ACCESS')] },
];
