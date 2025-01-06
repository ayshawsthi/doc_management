import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.userSubject.asObservable();
    
  private users = [
    { email: 'admin@example.com', password: 'admin123@', role: 'admin' },
    { email: 'user@example.com', password: 'user123@', role: 'user' },
  ];

  constructor(private toastr: ToastrService) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      this.userSubject.next(user);
    }
  }

  login(email: string, password: string) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(user));  // Store user info
      this.userSubject.next(user);
      this.toastr.success('Login successful!');
      return user;
    }
    this.toastr.error('Invalid email or password');
    return null;
  }

  signup(email: string, password: string): boolean {
    const userExists = this.users.some((u) => u.email === email);
    if (!userExists) {
      this.users.push({ email, password, role: 'user' });
        this.toastr.success('Signup successful! Redirecting to login page');
      return true;
    }
    this.toastr.error('Email already exists!', 'Error');
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
