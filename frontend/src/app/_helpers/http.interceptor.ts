import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  switchMap,
  throwError,
  filter,
  take,
} from 'rxjs';

import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';

const TOKEN_HEADER = 'x-access-token';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private refreshed: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}
  /**
   * intercept requests or responses handled
   *
   * @param request
   * @param next
   * @returns
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authRequest = request;
    const token = this.storageService.getToken();

    if (token != null) {
      /* request = request.clone({
        withCredentials: true,
        headers: request.headers.set(TOKEN_HEADER, token),
      }); */
      authRequest = this.tokenHandler(request, token);
    }

    return next.handle(authRequest).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !authRequest.url.includes('auth/login')
        ) {
          return this.handleError(authRequest, next);
        }

        return throwError(() => new Error(error));
      })
    );
  }

  /**
   * handles 401 error - unauthorized for incomplete request due to lack
   * of valid authentication credentials
   *
   * use refreshTokenSubject to track the current refresh token value.
   * It is null if no token is currently available.
   */
  private handleError(req: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.refreshed) {
      this.refreshed = true;
      this.refreshTokenSubject.next(null);

      const token = this.storageService.getRefreshToken();

      if (token) {
        return this.authService.refreshToken(token).pipe(
          // transforms token value and merges at output Observable
          switchMap((token: any) => {
            this.refreshed = false;

            this.storageService.saveToken(token.accessToken);
            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(this.tokenHandler(req, token.accessToken));
          }),
          catchError((error) => {
            this.refreshed = false;

            this.storageService.clean();
            return throwError(() => new Error(error));
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap((token) => next.handle(this.tokenHandler(req, token)))
    );
  }
  /**
   * returns a copy of the request with token, and token header
   */
  private tokenHandler(req: HttpRequest<unknown>, token: string) {
    return req.clone({
      headers: req.headers.set(TOKEN_HEADER, token),
    });
  }
}

export const httpsInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
