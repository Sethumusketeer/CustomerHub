import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { CreateUserRequest } from './create-user-request.model';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private http = inject(HttpClient);

    private apiUrl = `${environment.apiBaseUrl}/users`;

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    createUser(request: CreateUserRequest): Observable<User> {
        return this.http.post<User>(this.apiUrl, request);
    }
}