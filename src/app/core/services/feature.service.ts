import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Feature } from '../models/feature-request.dto';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private baseUrl = `${environment.apiBaseUrl}/features`;  // Pastikan API URL sesuai dengan backend

  constructor(private http: HttpClient) {}

  getAllFeatures(): Observable<Feature[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<Feature[]>(`${this.baseUrl}/all`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }
}
