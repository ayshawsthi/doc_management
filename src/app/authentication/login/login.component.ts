import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
    if (this.authService.login(email, password)) {
      this.authService.currentUser$.subscribe((user: any) =>{
        if(user.role == 'admin'){
          this.router.navigate(['/users/userList'])
        }else{
          this.router.navigate(['/users/docList'])
        }
      })
    } else {
      this.loginForm.reset();
    }
    }
  }

  getUserRole() {
    return 'admin'; // Mock for now
  }
}
