import { Routes } from '@angular/router';
import { featureGuard } from '../../core/guards/feature.guard';
import { LandingComponent } from './landing.component';

export const landingRoutes: Routes = [
  { path: 'home', component: LandingComponent },
];
