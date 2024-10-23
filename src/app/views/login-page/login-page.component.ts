import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PayVueService } from '../service/pay-vue.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  isLoginMode = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private payVueService: PayVueService) {
    this.loginForm = this.fb.group({
      number: ['', [Validators.required]], // Changed from email to number as per service
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      userRole: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required]], // Added number field for registration
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  switchMode(mode: boolean) {
    this.isLoginMode = mode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { number, password } = this.loginForm.value;
      
      this.payVueService.loginUser(number, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Login successful!';
          console.log('Login successful', response);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
          console.error('Login error:', error);
        }
      });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const userData = {
        userName: this.registerForm.value.userName,
        userRole: this.registerForm.value.userRole,
        email: this.registerForm.value.email,
        number: this.registerForm.value.number,
        password: this.registerForm.value.password
      };

      this.payVueService.registerUser(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Registration successful!';
          console.log('Registration successful', response);
          // Optionally switch to login mode after successful registration
          setTimeout(() => this.switchMode(true), 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          console.error('Registration error:', error);
        }
      });
    }
  }

}
