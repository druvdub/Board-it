import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private TOKEN_HEADER = 'x-access-token';
  constructor(private token: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.token.getToken();
    if (token != null) {
      request = request.clone({
        withCredentials: true,
        headers: request.headers.set(this.TOKEN_HEADER, token),
      });
    }
    return next.handle(request);
  }
}

export const httpsInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
