import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../service/notification.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-notification',
  standalone: true,
  imports :[CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  messages: { type: 'success' | 'error' | 'info'; text: string }[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.messages$.subscribe((messages) => {
      this.messages = messages;

      // Automatically remove the first message after 3 seconds, if it exists
      if (this.messages.length > 0) {
        setTimeout(() => {
          this.dismissMessage(0); // Removes the first message
        }, 3000);
      }
    });
  }

  dismissMessage(index: number) {
    this.notificationService.removeMessage(index);
  }
}
