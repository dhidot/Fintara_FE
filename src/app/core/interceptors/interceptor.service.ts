import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const AppHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('access_token');
  const router = inject(Router);

  // ✅ List endpoint PUBLIC (tidak butuh token)
  const publicEndpoints = [
    '/v1/plafonds/all',
    '/v1/auth/login-pegawai',
    '/v1/loan-requests/loan-simulate',
    '/v1/loan-requests/loan-web-simulate',
    '/v1/profilecustomer/upload-ktp',
    '/v1/profilecustomer/upload-selfie-ktp',
    '/v1/cloudinary/',
    '/v1/notifications/',
    '/v1/repayments/',
    '/download/',
    '/swagger-ui',
    '/v3/api-docs',
    '/api-docs',
  ];

  // Cek apakah request termasuk public
  const isPublic = publicEndpoints.some((url) => req.url.includes(url));

  let modifiedReq = req;

  // Inject token kalau bukan public endpoint
  if (token && !isPublic) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(modifiedReq).pipe(
    catchError((err) => {
      if (err.status === 403) {
        router.navigate(['/forbidden']);
      } else if (err.status === 404) {
        router.navigate(['/not-found']);
      }

      return throwError(() => err);
    })
  );
};
