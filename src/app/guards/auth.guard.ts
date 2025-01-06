import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): any {
    this.authService.currentUser$.subscribe((user: any) =>{
        if (user && user.role === 'admin') {
            return true; // Allow access for admin
          } else if (user) {
            this.router.navigate(['/auth/unauthorized']); // Redirect normal users to Unauthorized page
            return false;
          } else {
            this.router.navigate(['/auth/login']); // Redirect unauthenticated users to login
            return false;
          }
    })
    
  }
}
