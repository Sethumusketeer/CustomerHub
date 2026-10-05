import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-card',
  imports: [],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.css'
})
export class CustomerCardComponent {

  private router = inject(Router);

  @Input() customer!: Customer;

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  viewDetails(): void {
    this.close.emit();
    this.router.navigate(['/customers', this.customer.id]);
  }
}