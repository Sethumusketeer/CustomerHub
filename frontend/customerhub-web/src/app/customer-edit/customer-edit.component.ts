import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { UpdateCustomerRequest } from '../update-customer-request.model';

@Component({
  selector: 'app-customer-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerService);
  private router = inject(Router);
  isSaving = false;

  customerId!: number;

  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.customerId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadCustomer();
  }

  private loadCustomer(): void {
    this.customerService
      .getCustomerById(this.customerId)
      .subscribe({
        next: (customer: Customer) => {
          this.customerForm.patchValue({
            name: customer.name,
            email: customer.email,
            phone: customer.phone
          });
        },
        error: (error) => {
          console.error('Failed to load customer', error);
        }
      });
  }

  onSubmit(): void {

    if (this.customerForm.invalid) {
      return;
    }

    const customer: UpdateCustomerRequest = {
      name: this.customerForm.value.name ?? '',
      email: this.customerForm.value.email ?? '',
      phone: this.customerForm.value.phone ?? ''
    };

    this.isSaving = true;

    this.customerService
      .updateCustomer(this.customerId, customer)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          console.error('Failed to update customer', error);
          this.isSaving = false;
        }
      });
  }
}