import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { DashboardLoanRequestCountDto } from '../models/dashboard-loan-request-to-check';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private baseUrl = `${environment.dashboardBaseURL}`;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('DashboardService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  getSummary(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/data`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  getLoanRequestCount(): Observable<DashboardLoanRequestCountDto> {
    return this.http.get<any>(`${this.baseUrl}/loan`).pipe(
      map(response => ({
        loanRequestsToCheck: response.data.loanRequestsToCheck,
        loanRequestsCheckedByUser: response.data.loanRequestsCheckedByUser,
      })),
      catchError(this.handleError)
    );  
  }
}
