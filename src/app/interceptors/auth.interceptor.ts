import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const router = inject(Router);

    return next(req).pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
            router.navigate(['/login']); 
        }
        throw err;
    }));
}
