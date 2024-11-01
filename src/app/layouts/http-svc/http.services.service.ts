import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  constructor(private http: HttpClient) { }

  // HTTP GET request without authentication
  getHttp(apiUrl: string, successFunc: any, errorFunc: any) {
    this.http.get(apiUrl).subscribe({ next: successFunc, error: errorFunc });
  }

  // HTTP PUT request without authentication
  putHttp(apiUrl: string, data: any, successFunc: any, errorFunc: any) {
    this.http.put(apiUrl, data).subscribe({ next: successFunc, error: errorFunc });
  }

  // HTTP DELETE request without authentication
  deleteHttp(apiUrl: string, successFunc: any, errorFunc: any) {
    this.http.delete(apiUrl).subscribe({ next: successFunc, error: errorFunc });
  }

  // Observable-based HTTP GET request
  getHttpObservable(path: string, params: HttpParams | any = new HttpParams()): Observable<any> {
    return this.http.get(path, { params });
  }

  // Observable-based HTTP GET request for PDF response
  getHttpObservableAsPDF(path: string): Observable<Blob> {
    return this.http.get(path, { responseType: 'blob' });
  }

  // POST request without authentication
  postHttp<T>(apiUrl: string, data: T, successFunc: any, errorFunc: any) {
    this.http.post(apiUrl, data).subscribe({ next: successFunc, error: errorFunc });
  }

  // POST request with PDF response
  postHttpPDF(apiUrl: string, data: any, successFunc: any, errorFunc: any) {
    this.http.post(apiUrl, data, { responseType: 'blob' }).subscribe({ next: successFunc, error: errorFunc });
  }

  // POST request for CSV response
  postHttpCSV(apiUrl: string, data: any, successFunc: any, errorFunc: any) {
    this.http.post(apiUrl, data, { responseType: 'blob' }).subscribe({ next: successFunc, error: errorFunc });
  }

  // Multipart file upload request
  postHttpMultipartUpload(apiUrl: string, data: any, successFunc: any, errorFunc: any) {
    const headers = new HttpHeaders({
      'Content-Type': data.type
    });
    this.http.put(apiUrl + '?RemoveAuthToken', data, { headers }).subscribe({ next: successFunc, error: errorFunc });
  }

  // General file handling
  getFile(apiUrl: string, successFunc: any, errorFunc: any) {
    this.http.get(apiUrl, { responseType: 'blob', observe: 'response' }).subscribe({ next: successFunc, error: errorFunc });
  }

  // File upload to temporary URL
  uploadFileUsingTemporaryUploadUrl(apiUrl: string, file: any, successFunc: any, errorFunc: any) {
    this.http.put(apiUrl, file, { responseType: 'blob' }).subscribe({ next: successFunc, error: errorFunc });
  }

  // Save document in object storage
  saveDocumentInObjectStorage(apiUrl: string, file: any, successFunc: any, errorFunc: any) {
    this.http.post(apiUrl, file, { responseType: "blob" }).subscribe({ next: successFunc, error: errorFunc });
  }
}
