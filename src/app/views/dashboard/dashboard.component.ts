import { Component } from '@angular/core';
import { NavBarComponent } from "../../layouts/components/nav-bar/nav-bar.component";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from "../../layouts/components/footer/footer.component";
import { MetricsCardsComponent } from "../../layouts/components/metrics-cards/metrics-cards.component";
import { StockMetric } from '../../layouts/model/stockMetric.model';
import { NotificationService } from '../../layouts/service/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavBarComponent, NgbDropdownModule, FooterComponent, MetricsCardsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private notificationService: NotificationService) {}

  showNotification() {
    this.notificationService.addMessage({
      type: 'success',
      text: 'This is a test notification!'
    });
  }


  metrics: StockMetric[] = [
    { title: 'Total Items', value: 0, icon: 'bi-box-seam', trend: 'up', trendValue: 12 },
    { title: 'Total Value', value: '$0', icon: 'bi-currency-dollar', trend: 'up', trendValue: 8 },
    { title: 'Low Stock Items', value: 0, icon: 'bi-exclamation-triangle', trend: 'down', trendValue: 5 },
    { title: 'Out of Stock', value: 0, icon: 'bi-x-circle' , trend: 'down' ,trendValue :2},
  ];

}
