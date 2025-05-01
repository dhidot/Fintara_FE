// src/app/core/interceptors/interceptor.service.ts
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

  let modifiedReq = req;
  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(modifiedReq).pipe(
    catchError(err => {
      if (err.status === 403) {
        // Handle 403 Forbidden
        router.navigate(['/forbidden']);
      } else if (err.status === 404) {
        // Handle 404 Not Found
        router.navigate(['/not-found']);
      }

      return throwError(() => err);
    })
  );
};
