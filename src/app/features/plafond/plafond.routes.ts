import { Routes } from '@angular/router';
import { ListPlafondComponent } from '../../features/plafond/getAllPlafond/plafond-list.component';
import { AddPlafondComponent } from '../../features/plafond/addPlafond/add-plafond.component';
import { EditPlafondComponent } from '../../features/plafond/editPlafond/edit-plafond.component';
import { featureGuard } from '../../core/guards/feature.guard';

export const plafondRoutes: Routes = [
  { path: 'plafonds', component: ListPlafondComponent, canActivate: [featureGuard('FEATURE_PLAFOND_ACCESS')] },
  { path: 'plafond/add', component: AddPlafondComponent, canActivate: [featureGuard('FEATURE_PLAFOND_ACCESS')] },
  { path: 'plafond/edit/:id', component: EditPlafondComponent, canActivate: [featureGuard('FEATURE_PLAFOND_ACCESS')] }
];
