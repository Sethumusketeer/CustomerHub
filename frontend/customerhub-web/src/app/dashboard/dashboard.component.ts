import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private authService = inject(AuthService);
  private customerService = inject(CustomerService);

  username = this.authService.getUsername();
  role = this.authService.getRole();
  isAdmin = this.authService.isAdmin();

  totalCustomers = 0;
  activeCustomers = 0;
  recentCustomers: any[] = [];

  ngOnInit(): void {

    this.customerService.getCustomers().subscribe({
      next: customers => {

        this.totalCustomers = customers.length;

        this.activeCustomers = customers.length;

        this.recentCustomers = customers.slice(0, 5);
      },
      error: error => {
        console.error('Failed to load dashboard customers:', error);
      }
    });

  }
}