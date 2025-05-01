import { Routes } from '@angular/router';
import { ListCustomerComponent } from '../../features/customer/getAllCustomer/customer-list.component';
import { DetailCustomerComponent } from '../../features/customer/getCustomerById/get-customer-by-id.component';
import { featureGuard } from '../../core/guards/feature.guard';
import { FirstLoginGuard } from 'src/app/core/guards/first-login.guard';

export const customerRoutes: Routes = [
  { path: 'customer', component: ListCustomerComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_GET_ALL_CUSTOMER')] },
  { path: 'customer/:id', component: DetailCustomerComponent, canActivate: [FirstLoginGuard, featureGuard('FEATURE_GET_CUSTOMER_BY_ID')] },
];
