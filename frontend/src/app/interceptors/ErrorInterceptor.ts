import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toast: NgToastService) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError((error: unknown) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 400) {
                        this.toast.error({ detail: 'ERROR', summary: 'Bad request.', duration: 4000 });
                    } else if (error.status === 401) {
                        this.toast.error({ detail: 'ERROR', summary: 'Unauthorized.', duration: 4000 });
                    } else {
                        this.toast.error({ detail: 'ERROR', summary: 'An unexpected error occurred.', duration: 4000 });
                    }
                }
                return throwError(() => error);
            })
        );
    }
}