// dashboard.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private baseUrl = `${environment.apiBaseUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getSummary(): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any>(`${this.baseUrl}/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
