import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Pastikan path ini sesuai dengan struktur foldermu

@Injectable({
  providedIn: 'root'
})
export class PlafondService {
  private apiUrl = `${environment.apiBaseUrl}/plafonds`; // Ganti sesuai base URL backend kamu

  constructor(private http: HttpClient) {}

  getAllPlafonds(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any[]>(`${this.apiUrl}/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getPlafondByName(name: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any>(`${this.apiUrl}/get/${name}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getPlafondById(id: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any>(`${this.apiUrl}/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  createPlafond(plafond: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post<any>(`${this.apiUrl}/add`, plafond, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updatePlafond(name: string, plafond: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.put<any>(`${this.apiUrl}/update/${name}`, plafond, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
