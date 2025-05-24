import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlafondService {
  private readonly apiUrl = `${environment.plafondsBaseURL}`;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('PlafondService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  getAllPlafonds(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/all`).pipe(
      map(response => response.data), // Ambil hanya data
      catchError(this.handleError)
    );
  }

  getPlafondByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${name}`).pipe(
      map(response => response.data), // Ambil hanya data
      catchError(this.handleError)
    );
  }

  getPlafondById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`).pipe(
      map(response => response.data), // Ambil hanya data
      catchError(this.handleError)
    );
  }

  createPlafond(plafond: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, plafond).pipe(
      catchError(this.handleError)
    );
  }

  updatePlafond(name: string, plafond: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${name}`, plafond).pipe(
      catchError(this.handleError)
    );
  }
}
