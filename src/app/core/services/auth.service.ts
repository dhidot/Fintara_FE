import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'; // pastikan kamu sudah menginstall jwt-decode

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
    return this.http.post(`${this.baseUrl}/login-pegawai`, data).pipe(catchError(this.handleError));
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, null).pipe(catchError(this.handleError));
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email }).pipe(catchError(this.handleError));
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword, confirmPassword }).pipe(catchError(this.handleError));
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify-email?token=${token}`)
      .pipe(catchError(this.handleError));
  }

  getAllPegawai(): Observable<any[]> {
    return this.http.get<any[]>(`${this.pegawaiBaseUrl}`).pipe(catchError(this.handleError));
  }
}
