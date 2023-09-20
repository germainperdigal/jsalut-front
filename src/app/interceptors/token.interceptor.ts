import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //@TODO: utiliser angular2-jwt pour vérifier si expiré (le supprimer si oui).
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
      }
    });

    return next.handle(request);
  }
}
