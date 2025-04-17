import { Routes } from '@angular/router';
import { ListRoleComponent } from '../../features/role/getAllRole/role-list.component';
import { AddRoleComponent } from '../../features/role/addRole/add-role.component';
import { EditRoleComponent } from '../../features/role/editRole/edit-role.component';
import { featureGuard } from '../../core/guards/feature.guard';

export const roleRoutes: Routes = [
  { path: 'roles', component: ListRoleComponent, canActivate: [featureGuard('FEATURE_ROLE_ACCESS')] },
  { path: 'role/add', component: AddRoleComponent, canActivate: [featureGuard('FEATURE_ROLE_ACCESS')] },
  { path: 'role/edit/:id', component: EditRoleComponent, canActivate: [featureGuard('FEATURE_ROLE_ACCESS')] }
];
