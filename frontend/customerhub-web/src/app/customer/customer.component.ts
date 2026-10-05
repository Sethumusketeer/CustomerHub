import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { RouterLink } from '@angular/router';
import { CustomerCardComponent } from '../customer-card/customer-card.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterLink, CustomerCardComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  private customerService = inject(CustomerService);
  private authService = inject(AuthService);

  isLoading = false;
  customers: Customer[] = [];
  selectedCustomer?: Customer;

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {

  this.isLoading = true;

  this.customerService.getCustomers().subscribe({
      next: (response) => {
        this.customers = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load customers', error);
        this.isLoading = false;
      }
    });
  }

  showCustomerPreview(customer: Customer): void {
    this.selectedCustomer = customer;
  }
}