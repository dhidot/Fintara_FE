// src/app/services/pegawai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterPegawaiRequest } from '../models/register-pegawai-request.dto';
import { PegawaiDetailsRequestDTO } from '../models/pegawai-detail-request.dto';
import { PegawaiProfile } from '../models/pegawai-profile.dto';

@Injectable({
  providedIn: 'root',
})
export class PegawaiService {
  private baseUrl = `${environment.apiBaseUrl}/pegawai`;

  constructor(private http: HttpClient) {}

  getAllPegawai(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any[]>(this.baseUrl, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  getPegawaiById(id: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  getMyProfile() {
    const token = localStorage.getItem('access_token');
    return this.http.get<PegawaiProfile>(`${this.baseUrl}/me`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  registerPegawai(data: RegisterPegawaiRequest) {
    const token = localStorage.getItem('access_token');
    return this.http.post<any>(`${this.baseUrl}/register`, data, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
     });
  }

  updatePegawaiDetails(id: string, data: PegawaiDetailsRequestDTO): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.put<any>(`${environment.apiBaseUrl}/pegawaiprofile/update/${id}`, data, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }
}
