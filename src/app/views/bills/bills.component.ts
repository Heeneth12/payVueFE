import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../../layouts/components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../layouts/components/footer/footer.component";
import { PayVueService } from '../service/pay-vue.service';
import { CommonModule } from '@angular/common';
import { Bills } from '../../layouts/model/bill.model';
import { FormsModule } from '@angular/forms';
import { StockMetric } from '../../layouts/model/stockMetric.model';
import { MetricsCardsComponent } from "../../layouts/components/metrics-cards/metrics-cards.component";

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, FormsModule, CommonModule, MetricsCardsComponent],
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  invoiceId: string = 'a9b71652-a54b-4ad1-badf-12044683ed58';
  invoiceData: any = {};
  billsList: Bills[] = [];
  filteredBillsList: Bills[] = []; 
  searchTerm: string = '';
  selectedCategory: string = '';
  togglePage:boolean = true;

  categories: string[] = ['Mobile', 'Laptop', 'Accessories', 'Others'];
  metrics: StockMetric[] = [
    { title: 'Total Items', value: 0, icon: 'bi bi-receipt', trend: 'up', trendValue: 12 },
    { title: 'Total Value', value: '$0', icon: 'bi-currency-dollar', trend: 'up', trendValue: 8 },
    { title: 'Low Stock Items', value: 0, icon: 'bi-exclamation-triangle', trend: 'down', trendValue: 5 },
    { title: 'Out of Stock', value: 0, icon: 'bi-x-circle' , trend: 'down' ,trendValue :2},
  ];

  constructor(private payVueService: PayVueService) { }

  ngOnInit(): void {
    this.getBillById(this.invoiceId);
    this.getAllBills();
  }

    // Fetch all bills and map response to Bills model
    getAllBills() {
      this.payVueService.getAllInvoices(
        (response: any) => {
          // Map response data to array of Bills
          this.billsList = response.data.map((item: any) => Object.assign(new Bills(), item));
          this.filteredBillsList = this.billsList; // Initialize filteredBillsList
          console.log("All invoices:", this.billsList);
        },
        (error: any) => {
          console.error("Error getting Bill data", error);
        }
      );
    }
  

  getBillById(invoiceId: string) {
    this.payVueService.getInvoiceById(invoiceId,
      (response: any) => {
        this.invoiceData = response.data;
        console.log("Invoice data:", this.invoiceData);
      },
      (error: any) => {
        console.error("Error getting Bill data", error);
      }
    );
  }

  // TrackBy function for performance optimization
  trackByInvoiceId(index: number, invoice: Bills): string {
    return invoice.invoiceUuid;
  }
  trackByMetricTitle(index: number, metric: StockMetric): string {
    return metric.title;
  }
  

  filterItems(): void {
    this.filteredBillsList = this.billsList.filter(item =>
      (!this.searchTerm || item.status.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedCategory || item.status === this.selectedCategory)
    );
  }

  toggleBillView(billUuid:string | null ){
    if(billUuid != billUuid){
      this.togglePage = !this.togglePage;
    }
    else{
      this.togglePage = !this.togglePage;
    }

  }
}
