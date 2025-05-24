import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root', // Menandakan service ini tersedia di seluruh aplikasi
})
export class UserService {
  private baseUrl = `${environment.userBaseURL}`;; // URL API pegawai (sesuaikan dengan URL backend kamu)

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('UserService error:', error);
    return throwError(() => new Error(error.message || 'Terjadi kesalahan pada permintaan.'));
  }

  uploadProfilePhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file, file.name); // name harus sama dengan @RequestParam("foto")

    return this.http.put<any>(`${this.baseUrl}/update/foto`, formData).pipe(
      map(response => response.data), // Ambil hanya data
      catchError(this.handleError)
    );
  }
}
