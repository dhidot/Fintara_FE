import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.authBaseURL}`;
  private pegawaiBaseUrl = `${environment.pegawaiBaseURL}`;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('AuthService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.userId || null;
    } catch (error) {
      console.error('Gagal decode JWT:', error);
      return null;
    }
  }

  getRole(): string | null {
    return localStorage.getItem('role')?.toUpperCase() ?? null;
  }

  login(data: { nip: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login-pegawai`, data).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, null).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/forgot-password`, { email }).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reset-password`, {
      token,
      newPassword,
      confirmPassword
    }).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/verify-email?token=${token}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  resendVerificationEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/resend-verification`, { email }).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  getAllPegawai(): Observable<any[]> {
    return this.http.get<any>(`${this.pegawaiBaseUrl}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }
}
