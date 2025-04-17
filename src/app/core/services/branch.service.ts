import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private baseUrl = `${environment.apiBaseUrl}/branches`;

  constructor(private http: HttpClient) {}

  getAllBranches(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any[]>(`${this.baseUrl}/all`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  addBranch(data: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(`${this.baseUrl}/add`, data, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  getBranchById(id: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  updateBranch(id: string, branch: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.put(`${this.baseUrl}/update/${id}`, branch, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }
}
