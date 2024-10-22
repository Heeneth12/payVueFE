import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'], // Corrected to styleUrls
})
export class NavBarComponent implements OnInit {
  userRole: string | null = null; // To store the user role
  userName: string| null = null;
  isDropdownOpen: boolean = false; // To manage the dropdown visibility

  // constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.getUserData();
    }
  }

  getUserData() {
    this.userRole = sessionStorage.getItem('role');
    this.userName = sessionStorage.getItem('userName')
  }

  logOut() {
    this.userRole = null; // Reset user role on logout
    this.userName = null;
    this.isDropdownOpen = false; // Close dropdown
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}