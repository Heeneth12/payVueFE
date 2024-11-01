import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./layouts/components/nav-bar/nav-bar.component";
import { NotificationComponent } from "./layouts/components/notification/notification.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'payVueFE';

  notifications = [
    { type: 'success', text: 'Invoice created successfully!' }
  ];
  
}
