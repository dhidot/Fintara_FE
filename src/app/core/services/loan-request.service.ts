import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoanRequestApprovalDTO } from '../models/loan-request-approval.dto';
import { LoanReviewDTO } from '../models/loan-review.dto';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {
  private apiUrl = `${environment.loanRequestBaseURL}`;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('LoanRequestService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  // MARKETING
  getLoanRequestsForMarketing(): Observable<LoanRequestApprovalDTO[]> {
    return this.http.get<any>(`${this.apiUrl}/marketing/all`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  reviewLoanRequest(id: string, payload: LoanReviewDTO): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/review/${id}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  // BRANCH MANAGER
  getLoanRequestsForBranchManager(): Observable<LoanRequestApprovalDTO[]> {
    return this.http.get<any>(`${this.apiUrl}/branch-manager/all`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  reviewLoanRequestByBm(id: string, payload: LoanReviewDTO): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/branch-manager/review/${id}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  // BACK OFFICE
  getLoanRequestsForBackOffice(): Observable<LoanRequestApprovalDTO[]> {
    return this.http.get<any>(`${this.apiUrl}/back-office/all`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  disburseLoanRequest(loanRequestId: string, payload: LoanReviewDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/back-office/disburse/${loanRequestId}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<LoanRequestApprovalDTO> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }
}
