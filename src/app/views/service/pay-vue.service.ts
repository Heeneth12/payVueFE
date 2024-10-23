import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayVueService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080'; // Base API URL

  // POST request to login a user
  loginUser(number: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/user/login`;
    const body = { number, password };
    return this.http.post(url, body);
  }

  // Example of a POST request to register a new user
  registerUser(userData: any): Observable<any> {
    const url = `${this.apiUrl}/user/register`;
    return this.http.post(url, userData);
  }

}
