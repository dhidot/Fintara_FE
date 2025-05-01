import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private baseUrl = `${environment.branchesBaseURL}`;

  private handleError(error: any): Observable<never> {
    console.error('BranchService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  constructor(private http: HttpClient) {}

  getAllBranches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(catchError(this.handleError));
  }

  addBranch(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data).pipe(catchError(this.handleError));
  }

  getBranchById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateBranch(id: string, branch: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, branch).pipe(catchError(this.handleError));
  }
}
