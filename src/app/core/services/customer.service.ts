// src/app/services/pegawai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = `${environment.apiBaseUrl}/customer`;

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any[]>(`${this.baseUrl}/all`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }
}
