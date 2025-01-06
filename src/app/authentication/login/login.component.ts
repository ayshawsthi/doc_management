import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  user: any;

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
      this.user = this.authService.login(email, password);
      console.log(this.user);
      this.router.navigate(['/users']); // Redirect to homepage
    } else {
      this.loginForm.reset();
    }
    }
  }

  getUserRole() {
    return 'admin'; // Mock for now
  }
}
