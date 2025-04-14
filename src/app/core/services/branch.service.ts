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
}
