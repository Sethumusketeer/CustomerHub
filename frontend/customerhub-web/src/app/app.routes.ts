import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { adminGuard } from './admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
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
    component: HomeComponent
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];