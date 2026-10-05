import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer-details',
  imports: [RouterLink],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent implements OnInit {
  isLoading = false;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private authService = inject(AuthService);

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  customer?: Customer;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.isLoading = true;

    this.customerService.getCustomerById(id).subscribe({
      next: (response) => {
        this.customer = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load customer', error);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/customers']);
  }

  deleteCustomer():void{
    this.customerService.deleteCustomer(this.customer?.id ?? 0).subscribe({
      next: () => {
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        console.error('Failed to delete customer', error);
      }
    });
  }
}