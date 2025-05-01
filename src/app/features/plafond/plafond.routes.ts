import { Routes } from '@angular/router';
import { ListPlafondComponent } from '../../features/plafond/getAllPlafond/plafond-list.component';
import { AddPlafondComponent } from '../../features/plafond/addPlafond/add-plafond.component';
import { EditPlafondComponent } from '../../features/plafond/editPlafond/edit-plafond.component';
import { featureGuard } from '../../core/guards/feature.guard';
import { FirstLoginGuard } from 'src/app/core/guards/first-login.guard';

export const plafondRoutes: Routes = [
  { path: 'plafonds', component: ListPlafondComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_GET_ALL_PLAFOND')] },
  { path: 'plafonds/add', component: AddPlafondComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_ADD_PLAFOND')] },
  { path: 'plafonds/edit/:id', component: EditPlafondComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_UPDATE_PLAFOND')] }
];
