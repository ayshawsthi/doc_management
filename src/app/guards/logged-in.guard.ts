// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // Check if the user is logged in
    const user = this.authService.currentUser$.subscribe((user: any) =>{
        if (user) {
            // If the user is logged in, redirect to the respective homepage based on role
            if (user.role === 'admin') {
              this.router.navigate(['/users/userList']);
            } else if (user.role === 'user') {
              this.router.navigate(['/users/docList']);
            }
            return false;  // Prevent loading the login page or any unauthorized page
          } else {
            // If not logged in, allow navigation to the login page
            return true;
          }
    });
    
  }
}
