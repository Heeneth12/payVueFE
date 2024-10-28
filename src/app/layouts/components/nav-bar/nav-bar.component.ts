import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from "../footer/footer.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule, FormsModule, NgbPopoverModule, FooterComponent , ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'], // Corrected to styleUrls
})
export class NavBarComponent implements OnInit {
  userRole: string | null = null;
  userName: string | null = "Heeneth";
  isDropdownOpen = false;
  scrolled = false;
  isMenuOpen = false;
  searchQuery = '';
  searchFocused = false;
  unreadNotifications = 3;

  notifications: Notification[] = [
    { id: 1, message: 'New invoice received', time: '2 hours ago', isRead: false },
    { id: 2, message: 'Payment processed', time: '1 day ago', isRead: false },
    { id: 3, message: 'New customer signed up', time: '2 days ago', isRead: true },
    { id: 4, message: 'Invoice #12345 is overdue', time: '3 days ago', isRead: true },
    { id: 5, message: 'Subscription renewed', time: '5 days ago', isRead: true },
    { id: 6, message: 'Refund request received', time: '6 days ago', isRead: true }
  ];

  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'bi bi-grid', permission: 'all' },
    { label: 'Invoice', route: '/invoice', icon: 'bi bi-receipt', permission: 'all' },
    { label: 'Bills & Payments', route: '/bills', icon: 'bi bi-cash', permission: 'all' },
    { label: 'Counselling', route: '/counselling', icon: 'bi bi-chat-dots', permission: 'all' },
    { label: 'Stock Register', route: '/stock', icon: 'bi bi-box', permission: 'all' }
  ];



  get filteredNavItems(): NavItem[] {
    return this.navItems.filter(item => 
      item.permission === 'all' || item.permission === this.userRole
    );
  }

  get unreadNotificationCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    if (sessionStorage.getItem('token')) {
      this.userRole = sessionStorage.getItem('role');
      this.userName = sessionStorage.getItem('userName');
    }
  }

  markNotificationAsRead(notificationId: number): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
  }

  markAllNotificationsAsRead(): void {
    this.notifications.forEach(notification => {
      notification.isRead = true;
    });
  }

  logOut(): void {
    sessionStorage.clear();
    this.userRole = null;
    this.userName = null;
    this.isDropdownOpen = false;
    // Add navigation to login page
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleSearch(): void {
    if (this.searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery);
    }
  }
}

// nav-bar.types.ts
export interface NavItem {
  label: string;
  route: string;
  icon: string;
  permission: 'all' | 'admin' | 'counselor' | 'user';
}

export interface Notification {
  id: number;
  message: string;
  time: string;
  isRead: boolean;
}