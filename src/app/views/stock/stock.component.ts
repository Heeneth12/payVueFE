import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavBarComponent } from "../../layouts/components/nav-bar/nav-bar.component";

interface StockItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  category: string;
  lastUpdated: Date;
}

interface StockMetric {
  title: string;
  value: string | number;
  icon: string;
  trend?: 'up' | 'down';
  trendValue?: number;
}

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarComponent],
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
  currentItemId: number | null = null;

  categories: string[] = ['Electronics', 'Clothing', 'Food', 'Beverages', 'Others'];
  
  metrics: StockMetric[] = [
    { title: 'Total Items', value: 0, icon: 'bi-box-seam', trend: 'up', trendValue: 12 },
    { title: 'Total Value', value: '$0', icon: 'bi-currency-dollar', trend: 'up', trendValue: 8 },
    { title: 'Low Stock Items', value: 0, icon: 'bi-exclamation-triangle', trend: 'down', trendValue: 5 },
    { title: 'Out of Stock', value: 0, icon: 'bi-x-circle' }
  ];

  itemForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    quantity: new FormControl(1, Validators.required),
    unitPrice: new FormControl(0, Validators.required),
  });

  ngOnInit(): void {
    this.updateMetrics();
    this.filterItems();
  }

  openAddItemModal(): void {
    this.editMode = false;
    this.itemForm.reset({ quantity: 1, unitPrice: 0 });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveItem(): void {
    const newItem: StockItem = {
        id: this.editMode && this.currentItemId ? this.currentItemId : new Date().getTime(),
        name: this.itemForm.value.name ?? '',
        category: this.itemForm.value.category ?? '',
        quantity: this.itemForm.value.quantity ?? 0,
        unitPrice: this.itemForm.value.unitPrice ?? 0,
        lastUpdated: new Date()
    };

    if (this.editMode) {
        const index = this.items.findIndex(item => item.id === newItem.id);
        if (index !== -1) {
            this.items[index] = newItem;
        }
    } else {
        this.items.push(newItem);
    }

    this.updateMetrics();
    this.filterItems();
    this.closeModal();
    this.currentItemId = null;  // Reset after saving
}



editItem(item: StockItem): void {
  this.editMode = true;
  this.currentItemId = item.id;
  this.itemForm.patchValue(item);
  this.showModal = true;
}


  deleteItem(item: StockItem): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.items = this.items.filter(i => i.id !== item.id);
      this.updateMetrics();
      this.filterItems();
      this.closeModal();
    }
  }

  updateMetrics(): void {
    const totalValue = this.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    this.metrics[0].value = this.items.length;
    this.metrics[1].value = totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    this.metrics[2].value = this.items.filter(item => item.quantity < 10).length;
    this.metrics[3].value = this.items.filter(item => item.quantity === 0).length;
  }

  filterItems(): void {
    this.filteredItems = this.items.filter(item => 
      (!this.searchTerm || item.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedCategory || item.category === this.selectedCategory)
    );
  }

  updateItem(item: StockItem): void {
    item.lastUpdated = new Date();
    this.updateMetrics();
  }

  trackByItemId(index: number, item: StockItem): number {
    return item.id;
  }

  trackByMetricTitle(index: number, metric: StockMetric): string {
    return metric.title;
  }
}
