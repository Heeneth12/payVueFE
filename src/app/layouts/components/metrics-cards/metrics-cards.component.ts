import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StockMetric } from '../../model/stockMetric.model';


@Component({
  selector: 'app-metrics-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics-cards.component.html',
  styleUrls: ['./metrics-cards.component.css']
})
export class MetricsCardsComponent {
  @Input() metrics: StockMetric[] = [];
  
  // Optional: Track by function for ngFor optimization
  trackByMetricTitle(index: number, metric: StockMetric): string {
    return metric.title;
  }
}
