import { Component } from '@angular/core';
import { CheckoutFacadeService } from '../checkout-facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout-layout',
  templateUrl: './checkout-layout.component.html',
  styleUrls: ['./checkout-layout.component.css']
})
export class CheckoutLayoutComponent {
  imageUrls: string[] = [
    'assets/img/payment/1.png',
    'assets/img/payment/2.png',
    'assets/img/payment/5.png',
    'assets/img/payment/22.png'
  ];

  loading$ : Observable<boolean>;

  constructor(private checkoutFacade : CheckoutFacadeService){
    this.loading$ = this.checkoutFacade.loadingSubject$;
  }
}
