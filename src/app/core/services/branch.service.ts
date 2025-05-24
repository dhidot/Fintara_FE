import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private baseUrl = `${environment.branchesBaseURL}`;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('BranchService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  getAllBranches(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/all`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  addBranch(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, data).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  getBranchById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  updateBranch(id: string, branch: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, branch).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }
}
