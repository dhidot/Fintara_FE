import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'; // pastikan kamu sudah menginstall jwt-decode

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;
  private pegawaiBaseUrl = `${environment.pegawaiBaseURL}`; // URL untuk pegawai

  constructor(private http: HttpClient) {}

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

  login(data: { nip: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login-pegawai`, data);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(`${this.baseUrl}/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword });
  }

  // Mengambil data pegawai dari backend
  getAllPegawai(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any[]>(`${this.pegawaiBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
