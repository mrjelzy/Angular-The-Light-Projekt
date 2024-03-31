import { Component } from '@angular/core';
import { CartFacadeService } from '../../cart/cart-facade.service';
import { Observable, take } from 'rxjs';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-or-guest',
  templateUrl: './login-or-guest.component.html',
  styleUrls: ['./login-or-guest.component.css']
})
export class LoginOrGuestComponent {

  cart$: Observable<Configuration[]>;

  constructor(private cartFacade : CartFacadeService, private router : Router){
    this.cart$ = this.cartFacade.cartItems$;

    // this.cart$.pipe(take(1)).subscribe(cart => {
    //   if(cart.length === 0){
    //     this.router.navigate(['/cart']).then(() => {
    //       console.log('Panier Vide | Redirection effectuée vers le panier');
    //     });
    //   }
    // });
  }

  ngOnInit(){

  }

  clickGuest(){
    this.router.navigate(['/checkout/guest']);

  }

}
