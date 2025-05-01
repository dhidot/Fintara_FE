import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Feature } from '../../core/models/feature-request.dto';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = `${environment.rolesBaseURL}`;
  private featureRoleUrl = `${environment.roleFeatureBaseURL}`;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('RoleService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(catchError(this.handleError));
  }

  getRolesWithFeatureCount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/with-feature-count`).pipe(catchError(this.handleError));
  }

  getRoleById(roleId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${roleId}`).pipe(catchError(this.handleError));
  }

  createRole(role: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, role).pipe(catchError(this.handleError));
  }

  updateRole(roleId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/edit/${roleId}`, data).pipe(catchError(this.handleError));
  }

  addRoleWithFeatures(roleId: string, featureIds: string[]): Observable<any> {
    return this.http.post<any>(`${this.featureRoleUrl}/assign-multiple-features`, {
      roleId,
      featureIds,
    }).pipe(catchError(this.handleError));
  }

  getFeaturesByRole(roleId: string): Observable<Feature[]> {
    return this.http.get<Feature[]>(`${this.featureRoleUrl}/${roleId}/features`).pipe(catchError(this.handleError));
  }

  deleteRole(roleId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${roleId}`).pipe(catchError(this.handleError));
  }
}
