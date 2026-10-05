import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('access_token');

  let modifiedReq = req;

  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'X-Client': 'CustomerHub'
      }
    });
  }

  return next(modifiedReq).pipe(

    catchError((error) => {

      switch (error.status) {
        case 401:
          console.warn('Unauthorized request');
          break;

        case 403:
          console.warn('Forbidden request');
          break;

        case 404:
          console.warn('Resource not found');
          break;

        case 500:
          console.error('Internal server error');
          break;
      }

      return throwError(() => error);
    })
  );
};