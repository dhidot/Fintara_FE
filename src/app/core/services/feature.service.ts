import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Feature } from '../models/feature-request.dto';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private baseUrl = `${environment.featuresBaseURL}`;

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('FeatureService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  getAllFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(`${this.baseUrl}/all`).pipe(catchError(this.handleError));
  }

  getAllGroupedFeatures(): Observable<Record<string, Feature[]>> {
    return this.http.get<Record<string, Feature[]>>(`${this.baseUrl}/grouped`).pipe(catchError(this.handleError));
  }
}
