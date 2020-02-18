import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private toast: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if ([401, 403].indexOf(error.status) !== -1) {
                        // logout?
                    } else if ([0].indexOf(error.status) !== -1) {
                        // backend is offline. logout?
                    } else if ([500].indexOf(error.status) !== -1) {

                    }

                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
                    }
                    if (error.error.message) {
                        this.toast.error(error.error.message);
                    }

                    return throwError(error);

                })
            );
    }
}
