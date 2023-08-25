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



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
    
  private clientSecret !: string;

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

  }

  pay() {
    this.paying = true;
    this.elements.submit().then(async (result) => {

      if (result.error) {
        console.log(result.error);
        this.paying = false;
        return;
      }

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
      return_url: 'https://e54c-92-223-89-142.ngrok-free.app/',
      },
      redirect: 'always',
    }).subscribe(result => {
      this.paying = false;
      console.log(result);
    });
  })
  }




}
