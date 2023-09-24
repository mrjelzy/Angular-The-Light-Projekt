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
    const specificUrls = ['https://directus.thelightprojekt.com/items/guests', 
                          'https://directus.thelightprojekt.com/items/configurations_attributes',
                          'https://directus.thelightprojekt.com/items/configurations_options',
                          'https://directus.thelightprojekt.com/items/configurations',
                          'https://directus.thelightprojekt.com/items/carts',
                          'https://directus.thelightprojekt.com/items/carts_configurations',
                          'https://directus.thelightprojekt.com/files',
                          'https://directus.thelightprojekt.com/items/prescriptions',
                          'https://directus.thelightprojekt.com/items/prescriptions_configurations',
                          'https://directus.thelightprojekt.com/items/addresses',
                          'https://directus.thelightprojekt.com/items/orders'
                        ];
    const apiUrl = 'https://directus.thelightprojekt.com/items/';
    let addSpecificHeader = false;
    const authToken = process.env['DIRECTUS_API_KEY'];
    // Vérifiez si la requête correspond à vos critères (par exemple, l'URL).
    if (specificUrls.some(url => request.url === url)) {
      // Récupérez le token d'authentification (Bearer token) depuis votre source.
        addSpecificHeader = true;
    }else if (request.url.startsWith(apiUrl)) {
      const path = request.url.replace(apiUrl, '');
      const pathSegments = path.split('/');
  
      switch (pathSegments[0]) {
          case 'carts':
              if (pathSegments.length > 1) {
                  addSpecificHeader = true; // Condition pour ajouter l'en-tête spécifique
              }
              break;
              
          case 'orders':
            if (pathSegments.length > 1) {
                addSpecificHeader = true; // Condition pour ajouter l'en-tête spécifique
            }
            break;

          case 'configurations':
            if (pathSegments.length > 1) {
                addSpecificHeader = true; // Condition pour ajouter l'en-tête spécifique
            }
            break;

          case 'configurations_options':
            if (pathSegments.length > 1) {
                addSpecificHeader = true; // Condition pour ajouter l'en-tête spécifique
            }
            break;

          case 'configurations_attributes':
            if (pathSegments.length > 1) {
                addSpecificHeader = true; // Condition pour ajouter l'en-tête spécifique
            }
            break;
          // Ajoutez d'autres cas pour d'autres types d'URL si nécessaire
      }
    }
      // Ajoutez le token Bearer à l'en-tête d'autorisation de la requête.
    if (addSpecificHeader) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }

    return next.handle(request);
  }
}