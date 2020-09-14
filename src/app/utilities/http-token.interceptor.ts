import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

/**
 * This interceptor automatically adds the token header needed by our backend API if such token is present
 * in the current state of the application.
 */
@Injectable({
  providedIn: "root"
})
export class TokenErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let newHeaders = req.headers;
    if (token) {
      this.router.navigate(["/auth/login"]);
    }
    newHeaders = newHeaders.append("token", token);
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq);
  }
}
