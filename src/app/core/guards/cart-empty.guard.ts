import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartFacadeService } from 'src/app/public/cart/cart-facade.service';

@Injectable({
  providedIn: 'root'
})
export class CartEmptyGuard implements CanActivate {

  constructor(private cartFacade: CartFacadeService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const cartItemsLength = this.cartFacade.getCartItemsLength(); // Replace with appropriate method to get cart items

    if (cartItemsLength === 0) {
      return this.router.createUrlTree(['/cart']); // Redirect to cart page if cart is empty
    }

    return true; // Allow navigation if cart is not empty
  }
}
