import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { AlertService } from "../services/alert.service";

export function loginInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const alertService = inject(AlertService);

    return next(req).pipe(catchError((err: HttpErrorResponse) => {
        console.error(err);
        alertService.showAlert("An error occured while logging in. Please retry later.", "error");
        throw err;
    }));
}