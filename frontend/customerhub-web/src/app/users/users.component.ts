import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserCreateModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);

  showCreateUserModal = false;

  openCreateUserModal(): void {
    this.showCreateUserModal = true;
  }

  closeCreateUserModal(): void {
    this.showCreateUserModal = false;
  }

  users: User[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;

    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load users', error);
        this.isLoading = false;
      }
    });
  }
}