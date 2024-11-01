import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StockItem } from '../../layouts/model/stockItem.model';
import { HttpServicesService } from '../../layouts/http-svc/http.services.service';

@Injectable({
  providedIn: 'root'
})
export class PayVueService {

  constructor(private httpService: HttpServicesService) { }

  private apiUrl = 'http://localhost:8080'; // Base API URL

  //POST request to login a user
  loginUser(number: string, password: string, successfn: any, errorfn: any):any{
    const body = { number, password };
    return this.httpService.postHttp(`${this.apiUrl}/user/login`, body, successfn, errorfn)

  }
  registerUser(userDate:any, successfn: any, errorfn: any){
     return this.httpService.postHttp(`${this.apiUrl}/user/register`, userDate, successfn, errorfn)
  }

  //Invoice

  createInvoice(invoice:any,successfn: any, errorfn: any){
    this.httpService.postHttp(`${this.apiUrl}/invoice/create`, invoice , successfn , errorfn)
  }

  getAllInvoices(successfn: any, errorfn: any):any{
    this.httpService.getHttp(`${this.apiUrl}/invoice/all`, successfn, errorfn)

  }

  getInvoiceById( invoiceId:string , successfn: any, errorfn: any):any{
    this,this.httpService.getHttp(`${this.apiUrl}/invoice/${invoiceId}`, successfn , errorfn)
  }

  // Stock API methods

  // Create or Update Stock
  addStock(stock: StockItem ,successfn: any, errorfn: any): any {
    return this.httpService.postHttp(`${this.apiUrl}/stock/save` , stock ,successfn, errorfn )
  }

  // Get All Stocks
  getAllStocks(successfn:any, errorfn:any):any {
    return this.httpService.getHttp(`${this.apiUrl}/stock/all`, successfn,errorfn)
  }

  // Get Stock by ID
  getStockById(id: string ,successfn:any, errorfn:any): any {
    return this.httpService.getHttp(`${this.apiUrl}/stock/${id}`, successfn,errorfn )
  }

  // Delete Stock by ID
  deleteStockById(id: string,successfn:any, errorfn:any): any {
    return this.httpService.deleteHttp(`${this.apiUrl}/stock/${id}`, successfn, errorfn)
  }

  updateStocks(stock: StockItem ,successfn: any, errorfn: any){
    return this.httpService.postHttp(`${this.apiUrl}/stock/update`,stock,successfn , errorfn)

  }
}
