import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = `${environment.customerBaseURL}`;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('CustomerService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  getAllCustomers(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/all`).pipe(
      map(response => response.data), // ✅ unwrap `data`
      catchError(this.handleError)
    );
  }

  getCustomerById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data), // ✅ unwrap `data`
      catchError(this.handleError)
    );
  }
}
