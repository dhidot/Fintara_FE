import { Routes } from '@angular/router';
import { ListBranchComponent } from '../../features/branch/getAllBranches/branch-list.component';
import { AddBranchComponent } from '../../features/branch/addBranch/add-branch.component';
import { EditBranchComponent } from '../../features/branch/editBranch/edit-branch.component';
import { featureGuard } from '../../core/guards/feature.guard';

export const branchRoutes: Routes = [
  { path: 'branches', component: ListBranchComponent, canActivate: [featureGuard('FEATURE_GET_ALL_BRANCHES_ACCESS')] },
  { path: 'branch/add', component: AddBranchComponent, canActivate: [featureGuard('FEATURE_ADD_BRANCHES_ACCESS')] },
  { path: 'branch/edit/:id', component: EditBranchComponent, canActivate: [featureGuard('FEATURE_UPDATE_BRANCHES_ACCESS')] }
];
