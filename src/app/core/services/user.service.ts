import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Pastikan path ini sesuai dengan struktur folder kamu

@Injectable({
  providedIn: 'root', // Menandakan service ini tersedia di seluruh aplikasi
})
export class UserService {
  private baseUrl = `${environment.userBaseURL}`;; // URL API pegawai (sesuaikan dengan URL backend kamu)

  constructor(private http: HttpClient) {}

  uploadProfilePhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file, file.name); // name harus sama dengan @RequestParam("foto")
    return this.http.put(`${this.baseUrl}/update/foto`, formData);
  }
}
