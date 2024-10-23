import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CreateInvoiceComponent } from './views/create-invoice/create-invoice.component';
import { LoginPageComponent } from './views/login-page/login-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'invoice', component: CreateInvoiceComponent },
];
