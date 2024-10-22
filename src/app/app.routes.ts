import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CreateInvoiceComponent } from './views/create-invoice/create-invoice.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'invoice', component: CreateInvoiceComponent },
];
