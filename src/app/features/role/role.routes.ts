import { Routes } from '@angular/router';
import { ListRoleComponent } from '../../features/role/getAllRole/role-list.component';
import { AddRoleComponent } from '../../features/role/addRole/add-role.component';
import { EditRoleComponent } from '../../features/role/editRole/edit-role.component';
import { featureGuard } from '../../core/guards/feature.guard';
import { FirstLoginGuard } from 'src/app/core/guards/first-login.guard';

export const roleRoutes: Routes = [
  { path: 'roles', component: ListRoleComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_GET_ALL_ROLE')] },
  { path: 'roles/add', component: AddRoleComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_ADD_ROLE')] },
  { path: 'roles/edit/:id', component: EditRoleComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_UPDATE_ROLE')] }
];
