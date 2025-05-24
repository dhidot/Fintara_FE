import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoanApprovalHistory } from '../../core/models/loan-approval-hitsory.dto';

@Injectable({
  providedIn: 'root'
})
export class LoanApprovalService {
  private apiUrl = `${environment.loanApprovalsBaseURL}`;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('LoanApprovalService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  getLoanApprovalHistory(): Observable<LoanApprovalHistory[]> {
    return this.http.get<any>(`${this.apiUrl}/approval-history`).pipe(
      map(response => response.data), // ✅ ambil hanya bagian `data`
      catchError(this.handleError)
    );
  }
}
