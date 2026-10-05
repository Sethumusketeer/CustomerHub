import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CreateCustomerRequest } from '../create-customer-request.model';

@Component({
  selector: 'app-customer-add',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent {

  private customerService = inject(CustomerService);
  private router = inject(Router);
  isSaving = false;

  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', Validators.required)
  });

  onSubmit(): void {

    if (this.customerForm.invalid) {
      return;
    }

    const customer: CreateCustomerRequest = {
      name: this.customerForm.value.name ?? '',
      email: this.customerForm.value.email ?? '',
      phone: this.customerForm.value.phone ?? ''
    };

    this.isSaving = true;

    this.customerService.createCustomer(customer).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        console.error('Failed to create customer', error);
        this.isSaving = false;
      }
    });
  }
}