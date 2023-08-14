import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { CartFacadeService } from '../../cart/cart-facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent {
  
  cart$ !: Observable<Configuration[]>;
  cart !: Configuration[];
  needPrescription : boolean = false;

  constructor(private cartFacade : CartFacadeService, private router : Router){
    this.cart$ = this.cartFacade.cartItems$;

    this.cart$.pipe(take(1)).subscribe(cart => this.cart = cart);
  }

  clickPrescriptionOrAddress(){
    for(const item of this.cart){
      if(item.is_prescription)
        this.needPrescription = true;
    }
    if(this.needPrescription){
      this.router.navigate(['/checkout/prescription']).then(() => {
        console.log('Redirection effectuée pour obtenir les prescriptions');
      });
    }else{
      this.router.navigate(['/checkout/address']).then(() => {
        console.log('Redirection effectuée pour obtenir l\'address');
      });
    }
  }
}
