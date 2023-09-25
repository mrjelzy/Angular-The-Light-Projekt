import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Liste des URL spécifiques pour lesquelles vous souhaitez ajouter le token Bearer.
    // const specificUrls = [''];
    // const apiUrl = 'https://directus.thelightprojekt.com/items/';
    // let addSpecificHeader = false;
    //   // Ajoutez le token Bearer à l'en-tête d'autorisation de la requête.
    // if (addSpecificHeader) {
    //     // request = request.clone({
    //     //   setHeaders: {
    //     //     Authorization: `Bearer ${authToken}`,
    //     //   },
    //     // });
    //   }
    return next.handle(request);
  }
}