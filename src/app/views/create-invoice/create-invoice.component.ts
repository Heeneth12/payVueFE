import { Component } from '@angular/core';
import { NavBarComponent } from "../../layouts/components/nav-bar/nav-bar.component";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockItem } from '../../layouts/model/stockItem.model';
import { PayVueService } from '../service/pay-vue.service';

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
  totalAmount: Number = 0;
  showProductSearch: boolean = false;
  selectedProductIndex: number | null = null;
  currentDate: Date = new Date();
  formattedDate: string = this.currentDate.toISOString().split('T')[0];

  stockList:StockItem[] =[];

  constructor(private fb: FormBuilder,private payVueService: PayVueService) {
    this.invoiceForm = this.fb.group({
      createdBy: ['1', Validators.required],
      issuedTo: ['2',],
      subject: ['Service per June 2023', Validators.required],
      products: this.fb.array([]),
      createdAt: [this.formattedDate , Validators.required],
      addDiscount: [true],
      totalAmount:this.totalAmount,
      status:["success"],
    });
  }

  ngOnInit(): void {
    this.loadAllStocks();
  }

  get products(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }

  createProduct(product?: StockItem): FormGroup {
    return this.fb.group({
      stock_uuid: [product?.stock_uuid || ''],
      stock_name: [product?.stock_name || '', Validators.required],
      stock_price: [product?.stock_price || 0, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      tax: [10],
      stock_type: [product?.stock_type || '']
    });
  }
  

  addProduct(): void {
    this.showProductSearch = true;
    this.selectedProductIndex = null;
  }

  loadAllStocks(): void {
    this.payVueService.getAllStocks(
      (response:any) => {
        console.log(response);
         this.stockList = response.data;
      },
      (error:any) => console.error('Error fetching stock items:', error)
    );
  }

  selectProduct(product: StockItem): void {
    if (this.selectedProductIndex !== null) {
      // Update existing product
      const productGroup = this.products.at(this.selectedProductIndex) as FormGroup;
      productGroup.patchValue({
        stock_uuid: product.stock_uuid,
        stock_name: product.stock_name,
        stock_price: product.stock_price,
        stock_type: product.stock_type
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

  get filteredProducts(): StockItem[] {
    return this.stockList.filter(product => 
      product.stock_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.stock_type.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  calculateTotal(): number {
    return this.products.controls.reduce((total, product) => {
      const price = product.get('stock_price')?.value || 0;
      const quantity = product.get('quantity')?.value || 0;
      this.totalAmount = total + (price * quantity);
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
      this.payVueService.createInvoice(
        this.invoiceForm.value,
        (response: any) => {
          console.log(response.data);
        },
        (error: any) => {
          console.error('Error creating invoice:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  

}