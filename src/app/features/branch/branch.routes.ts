import { Routes } from '@angular/router';
import { ListBranchComponent } from '../../features/branch/getAllBranches/branch-list.component';
import { AddBranchComponent } from '../../features/branch/addBranch/add-branch.component';
import { EditBranchComponent } from '../../features/branch/editBranch/edit-branch.component';
import { featureGuard } from '../../core/guards/feature.guard';
import { FirstLoginGuard } from 'src/app/core/guards/first-login.guard';

export const branchRoutes: Routes = [
  { path: 'branches', component: ListBranchComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_GET_ALL_BRANCHES')] },
  { path: 'branches/add', component: AddBranchComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_ADD_BRANCHES')] },
  { path: 'branches/edit/:id', component: EditBranchComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_UPDATE_BRANCHES')] }
];
