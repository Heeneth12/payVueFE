import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router: Router) { }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Check if the token exists and is not expired (basic check)
    return !!token; 
  }

  // Method to log out the user (remove the token)
  logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}