import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavBarComponent } from "../../layouts/components/nav-bar/nav-bar.component";
import { StockItem } from '../../layouts/model/stockItem.model';
import { StockMetric } from '../../layouts/model/stockMetric.model';
import { PayVueService } from '../service/pay-vue.service';
import { MetricsCardsComponent } from "../../layouts/components/metrics-cards/metrics-cards.component";
import { NotificationService } from '../../layouts/service/notification.service';
declare var bootstrap: any;

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarComponent, MetricsCardsComponent],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  items: StockItem[] = [];
  filteredItems: StockItem[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  showModal: boolean = false;
  editMode: boolean = false;
  currentItemId: string | null = null;
  selectedInput: string = 'Quantity';

  @ViewChild('staticBackdrop') modalElement!: ElementRef;

  categories: string[] = ['Mobile', 'Laptop', 'Accessories', 'Others'];

  metrics: StockMetric[] = [
    { title: 'Total Items', value: 0, icon: 'bi-box-seam', trend: 'up', trendValue: 12 },
    { title: 'Total Value', value: '$0', icon: 'bi-currency-dollar', trend: 'up', trendValue: 8 },
    { title: 'Low Stock Items', value: 0, icon: 'bi-exclamation-triangle', trend: 'down', trendValue: 5 },
    { title: 'Out of Stock', value: 0, icon: 'bi-x-circle', trend: 'down', trendValue: 2 },
  ];

  constructor(private payVueService: PayVueService, private notificationService: NotificationService) { }

  itemForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    quantity: new FormControl(0, Validators.required),
    price: new FormControl(0, Validators.required),
    units: new FormControl(0, Validators.required),
    unitSize: new FormControl(0, Validators.required)
  });


  ngOnInit(): void {
    this.loadAllStocks();
    this.updateMetrics();
    this.filterItems();
  }

  loadAllStocks(): void {
    this.payVueService.getAllStocks(
      (response: any) => {
        console.log(response);
        this.items = response.data;
        this.updateMetrics();
        this.filterItems();
      },
      (error: any) => console.error('Error fetching stock items:', error)
    );
  }

  openAddItemModal(): void {
    this.editMode = false;
    this.itemForm.reset({ quantity: 1, price: 0 });
    this.showModal = true;
  }

  saveItem(): void {
    const newItem: StockItem = {
      stock_uuid: this.editMode ? this.currentItemId : null,
      stock_name: this.itemForm.value.name ?? '',
      stock_type: this.itemForm.value.category ?? '',
      stock_quantity: this.itemForm.value.quantity ?? 0,
      stock_price: this.itemForm.value.price ?? 0,
      stock_unit: this.itemForm.value.units ?? 1,
      stock_unit_size: this.itemForm.value.unitSize ?? 1,
      updated_at: new Date()
    };
    if (this.editMode) {
      // Call the update API
      this.payVueService.updateStocks(newItem,
        (response: any) => {
          if (response.data != null) {
            this.showNotification('success', 'Successfully updated stock item');
            this.updateMetrics();
            this.filterItems();
            this.closeModalRef();
          }
        },
        (error: any) => {
          console.error('Error updating stock:', error);
        }
      );
    } else {
      // Call the add stock API
      this.payVueService.addStock(newItem,
        (response: any) => {
          if (response.data != null) {
            this.showNotification('success', 'Successfully added new stock item');
            this.updateMetrics();
            this.filterItems();
            this.closeModalRef();
          }
        },
        (error: any) => {
          console.error('Error adding stock:', error);
        }
      );
    }
  }

  editItem(item: StockItem): void {
    this.editMode = true;
    this.currentItemId = item.stock_uuid;
    this.itemForm.patchValue({
      name: item.stock_name,
      category: item.stock_type,
      quantity: item.stock_quantity,
      price: item.stock_price,
      units: item.stock_unit,
      unitSize: item.stock_unit_size
    });
    console.log(this.itemForm)
    this.showModal = true;
  }

  addItem(stock_uuid: string | null):void{


  }

  selectInput(input: string): void {
    this.selectedInput = input;
    // Reset touched status and value when switching input type
    if (input === 'Quantity') {
      this.itemForm.controls.units.reset();
    } else {
      this.itemForm.controls.quantity.reset();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.editMode = false;
    this.currentItemId = null;
    this.itemForm.reset();
  }

  closeModalRef() {
    const modalInstance = bootstrap.Modal.getInstance(this.modalElement.nativeElement) || new bootstrap.Modal(this.modalElement.nativeElement);
    modalInstance.hide();  // Hide the modal programmatically
    this.itemForm.reset();
  }

  deleteItem(stock_uuid: string | null): void {
    if (!stock_uuid) {
      console.warn('No stock_uuid provided for deletion');
      return;
    }
    this.payVueService.deleteStockById(stock_uuid,
      (response: any) => {
        if (response.data) {
          console.log(response.data)
          this.updateMetrics();
          this.loadAllStocks();
          this.showNotification('error', 'Deleted stock item successfully');
        }
      },
      (error: any) => console.error('Error deleting item:', error)
    );
  }


  updateMetrics(): void {
    const totalValue = this.items.reduce((acc, item) => acc + item.stock_price * item.stock_quantity, 0);
    this.metrics[0].value = this.items.length;
    this.metrics[1].value = totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    this.metrics[2].value = this.items.filter(item => item.stock_quantity < 10).length;
    this.metrics[3].value = this.items.filter(item => item.stock_quantity === 0).length;
  }

  filterItems(): void {
    this.filteredItems = this.items.filter(item =>
      (!this.searchTerm || item.stock_name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedCategory || item.stock_type === this.selectedCategory)
    );
  }

  showNotification(type: 'success' | 'error' | 'info', text: string) {
    this.notificationService.addMessage({
      type: type,
      text: text
    });
  }

  updateItem(item: StockItem): void {
    item.updated_at = new Date();
    console.log(item)
    this.updateMetrics();
  }

  trackByItemId(index: number, item: StockItem): string {
    return item.stock_uuid ?? '';
  }

  trackByMetricTitle(index: number, metric: StockMetric): string {
    return metric.title;
  }
}