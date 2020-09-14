import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { AlertService } from "app/shared/alert/alert.service";
import { Injectable } from "@angular/core";
import { AuthService } from "app/auth/auth.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private appAuthService: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          if (error.status === 401) {
            this.appAuthService.logout();
          }
          errorMessage = error.error.message
            ? `${error.status}- ${error.error.message} `
            : `Opps!! server down`;
        }
        this.alertService.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
