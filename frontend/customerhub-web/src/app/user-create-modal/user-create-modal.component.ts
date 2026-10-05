import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { UserService } from '../user.service';
import { CreateUserRequest } from '../create-user-request.model';

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-create-modal.component.html',
  styleUrl: './user-create-modal.component.css'
})
export class UserCreateModalComponent {

  private userService = inject(UserService);

  @Output() close = new EventEmitter<void>();
  @Output() userCreated = new EventEmitter<void>();

  isSaving = false;
  saveError = '';

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('User', Validators.required)
  });

  onClose(): void {
    this.close.emit();
  }

  createUser(): void {

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const request: CreateUserRequest = {
      username: this.userForm.value.username ?? '',
      password: this.userForm.value.password ?? '',
      role: this.userForm.value.role ?? 'User'
    };

    this.isSaving = true;
    this.saveError = '';

    this.userService.createUser(request).subscribe({
      next: () => {
        this.isSaving = false;
        this.userCreated.emit();
        this.close.emit();
      },

      error: (error) => {
        console.error('Failed to create user', error);

        this.isSaving = false;

        if (error.status === 409) {
          this.saveError = 'Username already exists.';
        } else {
          this.saveError = 'Failed to create user.';
        }
      }
    });
  }
}