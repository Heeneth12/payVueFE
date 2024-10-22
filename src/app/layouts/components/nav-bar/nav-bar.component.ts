import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule ,NgbPopoverModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'], // Corrected to styleUrls
})
export class NavBarComponent implements OnInit {
  userRole: string | null = null; // To store the user role
  userName: string| null = "Heeneth";
  isDropdownOpen: boolean = false; // To manage the dropdown visibility

  notifications = [
    { message: 'New invoice received', time: '2 hours ago' },
    { message: 'Payment processed', time: '1 day ago' },
    { message: 'New customer signed up', time: '2 days ago' },
    { message: 'Invoice #12345 is overdue', time: '3 days ago' },
    { message: 'Subscription renewed', time: '5 days ago' },
    { message: 'Refund request received', time: '6 days ago' }
  ];

  hasUnreadNotifications = this.notifications.length > 0;
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