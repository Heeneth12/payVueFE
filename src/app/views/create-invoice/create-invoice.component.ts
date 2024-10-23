import { Component } from '@angular/core';
import { NavBarComponent } from "../../layouts/components/nav-bar/nav-bar.component";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [CommonModule, NavBarComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent {
  invoiceForm: FormGroup;
  invoiceNumber = 'INV2398-08-087';
  searchTerm: string = '';
  showProductSearch: boolean = false;
  selectedProductIndex: number | null = null;
  currentDate: Date = new Date();
  formattedDate: string = this.currentDate.toISOString().split('T')[0];

  // Sample product list - replace with your actual product data or API call
  productList: Product[] = [
    { id: 1, name: 'Summer 2K23 T-shirt', price: 125000, description: 'Cotton T-shirt' },
    { id: 2, name: 'Winter Jacket', price: 250000, description: 'Warm jacket' },
    { id: 3, name: 'Denim Jeans', price: 175000, description: 'Blue denim' },
    { id: 4, name: 'Sneakers', price: 199000, description: 'Sports shoes' },
  ];

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      customer: ['John Smith', Validators.required],
      customerEmail: ['john_s@gmail.com', Validators.required],
      subject: ['Service per June 2023', Validators.required],
      invoiceDate: [this.formattedDate , Validators.required],
      addDiscount: [true],
      products: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  get products(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }

  createProduct(product?: Product): FormGroup {
    return this.fb.group({
      id: [product?.id || ''],
      name: [product?.name || '', Validators.required],
      price: [product?.price || 0, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      tax: [10],
      description: [product?.description || '']
    });
  }

  addProduct(): void {
    this.showProductSearch = true;
    this.selectedProductIndex = null;
  }

  selectProduct(product: Product): void {
    if (this.selectedProductIndex !== null) {
      // Update existing product
      const productGroup = this.products.at(this.selectedProductIndex) as FormGroup;
      productGroup.patchValue({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description
      });
    } else {
      // Add new product
      this.products.push(this.createProduct(product));
    }
    this.closeProductSearch();
  }

  editProduct(index: number): void {
    this.selectedProductIndex = index;
    this.showProductSearch = true;
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  closeProductSearch(): void {
    this.showProductSearch = false;
    this.searchTerm = '';
    this.selectedProductIndex = null;
  }

  get filteredProducts(): Product[] {
    return this.productList.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  calculateTotal(): number {
    return this.products.controls.reduce((total, product) => {
      const price = product.get('price')?.value || 0;
      const quantity = product.get('quantity')?.value || 0;
      return total + (price * quantity);
    }, 0);
  }

  calculateDiscount(): number {
    return this.calculateTotal() * 0.1;
  }

  calculateFinalTotal(): number {
    let total = this.calculateTotal();
    if (this.invoiceForm.get('addDiscount')?.value) {
      total -= this.calculateDiscount();
    }
    return total;
  }

  processInvoice(): void {
    if (this.invoiceForm.valid) {
      console.log('Processing invoice...', this.invoiceForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}