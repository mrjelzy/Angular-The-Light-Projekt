import { Component} from '@angular/core';
import { StripeService } from "ngx-stripe";
import { CheckoutFacadeService } from '../checkout-facade.service';
import {take } from 'rxjs';

import {
  StripeElementsOptions,
  StripeElements,
  StripeExpressCheckoutElement,
  StripePaymentElement
} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
    
  private clientSecret !: string;
  private guestId !: number | undefined;
  private cartId !: number | undefined;
  error : any | null = null;

  elements !: StripeElements;
  card !: StripePaymentElement;
  express !: StripeExpressCheckoutElement;
 
  elementsOptions: StripeElementsOptions = {
    locale: 'fr',
    mode: 'payment',
    amount: this.checkoutFacade.getTotal()*100,
    currency: 'eur',
  };

  paying = false;

  constructor(private stripeService: StripeService, 
              private checkoutFacade : CheckoutFacadeService) {
              }

  ngOnInit() {
    this.checkoutFacade.secretTokenIntent$.pipe(take(1)).subscribe(clientToken => {
      if(clientToken !== ""){
        this.clientSecret = clientToken;
      }});

    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      // Only mount the element the first time
      if(!this.card)
        this.card = this.elements.create('payment');
      this.card.mount("#card-element")

      if(!this.express)
        this.express = this.elements.create('expressCheckout');
      this.express.mount("#express-element");
      });

      this.guestId = this.checkoutFacade.getGuest().id;
      this.cartId = this.checkoutFacade.cartId;
  }

  ngAfterViewInit() {
    this.express.on('confirm', async (event) => {
      this.checkoutFacade.setLoading(true);
      this.paying = true;
      this.elements.submit().then(async (result) => {
        if (result.error) {
          // console.log(result.error);
          this.checkoutFacade.setLoading(false);
          this.error = result.error;
          this.paying = false;
          return;
        }
        this.confirmPayment();

    })
    });
  }

  pay() {
    this.checkoutFacade.setLoading(true);
    this.paying = true;
    this.elements.submit().then(async (result) => {

      if (result.error) {
        // console.log(result.error);
        this.checkoutFacade.setLoading(false);
        this.error = result.error;
        this.paying = false;
        return;
      }

      this.confirmPayment();

  })
  }

  confirmPayment(){
    this.stripeService.confirmPayment({
      elements: this.elements,
      clientSecret : this.clientSecret,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: this.checkoutFacade.getGuest().first_name + " " + this.checkoutFacade.getGuest().last_name,
            email: this.checkoutFacade.getGuest().email,
          },
        },
      return_url: environment.production ? `https://thelightprojekt.com/confirmation` : `${location.origin}/confirmation`,
      },
      redirect: 'always',
    }).subscribe(result => {
      this.checkoutFacade.setLoading(false);
      this.paying = false;
      this.error = result.error;
      // console.log(this.error);
    });
  }

  closeModal(){
    this.error = null;
    this.checkoutFacade.setErrorToNull();
  }


}
