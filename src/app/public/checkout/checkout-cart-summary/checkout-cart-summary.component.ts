import { Component } from '@angular/core';
import { CheckoutFacadeService } from '../checkout-facade.service';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout-cart-summary',
  templateUrl: './checkout-cart-summary.component.html',
  styleUrls: ['./checkout-cart-summary.component.css']
})
export class CheckoutCartSummaryComponent {
  cart$: Observable<Configuration[]>;
  total$: Observable<number>;

  constructor(private checkoutFacade : CheckoutFacadeService){
      this.cart$ = this.checkoutFacade.configurations$;
      this.total$ = this.checkoutFacade.total$;
  }
}
