import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoanRequestApprovalDTO } from '../models/loan-request-approval.dto';
import { LoanReviewDTO } from '../models/loan-review.dto';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {

  private apiUrl = `${environment.apiBaseUrl}/loan-requests`;

  constructor(private http: HttpClient) { }

  // MARKETING
  getLoanRequestsForMarketing(): Observable<LoanRequestApprovalDTO[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<LoanRequestApprovalDTO[]>(`${this.apiUrl}/marketing/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  reviewLoanRequest(id: string, payload: LoanReviewDTO): Observable<{ message: string }> {
    const token = localStorage.getItem('access_token');
    return this.http.put<{ message: string }>(`${this.apiUrl}/review/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // BRANCH MANAGER
  getLoanRequestsForBranchManager(): Observable<LoanRequestApprovalDTO[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<LoanRequestApprovalDTO[]>(`${this.apiUrl}/branch-manager/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  reviewLoanRequestByBm(id: string, payload: LoanReviewDTO): Observable<{ message: string }> {
    const token = localStorage.getItem('access_token');
    return this.http.put<{ message: string }>(`${this.apiUrl}/branch-manager/review/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // BACK OFFICE
  getLoanRequestsForBackOffice(): Observable<LoanRequestApprovalDTO[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<LoanRequestApprovalDTO[]>(`${this.apiUrl}/back-office/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }


  disburseLoanRequest(loanRequestId: string, notes: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.put<any>(`${this.apiUrl}/back-office/disburse/${loanRequestId}`, { notes }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }


  getById(id: string): Observable<LoanRequestApprovalDTO> {
    const token = localStorage.getItem('access_token');
    return this.http.get<LoanRequestApprovalDTO>(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

}
