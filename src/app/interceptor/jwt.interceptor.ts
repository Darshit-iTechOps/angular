import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { StorageHelper } from '@helpers/StorageHelper.helper';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  storageHelper: StorageHelper = new StorageHelper();
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (this.storageHelper.GetToken() && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageHelper.GetToken()}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // Do something
          }
        }
        return throwError(err);
      })
    );
  }
}
