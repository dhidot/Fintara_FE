import { Routes } from '@angular/router';
import { ListCustomerComponent } from '../../features/customer/getAllCustomer/customer-list.component';
import { featureGuard } from '../../core/guards/feature.guard';

export const customerRoutes: Routes = [
  { path: 'customer', component: ListCustomerComponent, canActivate: [featureGuard('FEATURE_GET_ALL_CUSTOMER_ACCESS')] }
];
