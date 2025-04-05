import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);

  if(req.headers.has('skip-alert')){
    return next(req);
  }
  
  return next(req)
    .pipe(
      catchError(err => {
      alertService.showAlert('An error occured. Please retry later.', 'error');
      return throwError(() => new HttpErrorResponse(err));
    }));
};
