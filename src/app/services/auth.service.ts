import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'user@example.com', password: 'user123', role: 'user' },
  ];

  constructor(private toastr: ToastrService) {}

  login(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(user));
      this.toastr.success('Login successful!');
      return true;
    }
    this.toastr.error('Invalid email or password');
    return false;
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
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
