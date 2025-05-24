import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterPegawaiRequest } from '../models/register-pegawai-request.dto';
import { PegawaiDetailsRequestDTO } from '../models/pegawai-detail-request.dto';
import { PegawaiProfile } from '../models/pegawai-profile.dto';

@Injectable({
  providedIn: 'root',
})
export class PegawaiService {
  private baseUrl = `${environment.pegawaiBaseURL}`;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('PegawaiService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  getAllPegawai(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  getPegawaiById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  getMyProfile(): Observable<PegawaiProfile> {
    return this.http.get<any>(`${this.baseUrl}/me`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  registerPegawai(data: RegisterPegawaiRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data).pipe(
      catchError(this.handleError)
    );
  }

  updatePegawaiDetails(id: string, data: PegawaiDetailsRequestDTO): Observable<any> {
    return this.http.put<any>(`${environment.pegawaiProfileBaseURL}/update/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  changePassword(data: { oldPassword: string; newPassword: string; confirmNewPassword: string }): Observable<any> {
    return this.http.put<any>(`${environment.authBaseURL}/change-password`, data).pipe(
      catchError(this.handleError)
    );
  }
}
