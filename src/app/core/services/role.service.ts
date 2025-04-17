import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Feature } from '../../core/models/feature-request.dto';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = `${environment.apiBaseUrl}/roles`;
  private featureRoleUrl = `${environment.apiBaseUrl}/role-features`;

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any[]>(`${this.baseUrl}/all`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  getRolesWithFeatureCount(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any[]>(`${this.baseUrl}/with-feature-count`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  getRoleById(roleId: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any>(`${this.baseUrl}/get/${roleId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  createRole(role: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(`${this.baseUrl}/add`, role, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  addRoleWithFeatures(roleId: string, featureIds: string[]): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(`${this.featureRoleUrl}/assign-multiple-features`, {
      roleId: roleId,           // Mengirim roleId dalam body
      featureIds: featureIds    // Mengirim featureIds dalam body
    }, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  updateRole(roleId: string, data: any): Observable<any> {
    const token = localStorage.getItem('access_token');  // Ambil token dari localStorage
    return this.http.put<any>(`${this.baseUrl}/edit/${roleId}`, data, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  getFeaturesByRole(roleId: string): Observable<Feature[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<Feature[]>(`${this.featureRoleUrl}/${roleId}/features`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }
}
