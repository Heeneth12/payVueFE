import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CreateInvoiceComponent } from './views/create-invoice/create-invoice.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { AuthGuard } from './layouts/auth/auth.guard';
import { BillsComponent } from './views/bills/bills.component';
import { StockComponent } from './views/stock/stock.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {path : 'dashboard', component: DashboardComponent  },
  { path: 'invoice', component: CreateInvoiceComponent },
  { path : 'bills' , component : BillsComponent},
  {path: 'stock', component : StockComponent}
];
