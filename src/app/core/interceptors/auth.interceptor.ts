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
                          'https://directus.thelightprojekt.com/items/prescriptions'
                        ];

    // Vérifiez si la requête correspond à vos critères (par exemple, l'URL).
    if (specificUrls.some(url => request.url === url)) {
      // Récupérez le token d'authentification (Bearer token) depuis votre source.
      const authToken = 'b53qAgC9Uvn4gYqdtNCBBv-35tnRJdkf';

      // Ajoutez le token Bearer à l'en-tête d'autorisation de la requête.
      if (authToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }
    }

    return next.handle(request);
  }
}