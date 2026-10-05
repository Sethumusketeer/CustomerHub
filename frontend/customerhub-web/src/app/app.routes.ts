import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'customers',
    component: CustomerComponent,
    canActivate: [authGuard]
  },
  {
    path: 'customers/add',
    component: CustomerAddComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'customers/:id/edit',
    component: CustomerEditComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [adminGuard]
  },
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  }
];