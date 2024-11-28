import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { AlertService } from "../services/alert.service";
import { Router } from "@angular/router";

export function loginInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const alertService = inject(AlertService);
    const router = inject(Router);

    return next(req).pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
            router.navigate(['/login']); 
        }
        alertService.showAlert("You have been disconnected. Please log in again.", "error");
        throw err;
    }));
}