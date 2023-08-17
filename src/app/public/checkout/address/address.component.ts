import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CheckoutFacadeService } from '../checkout-facade.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  constructor(private router : Router,
               private checkoutFacade : CheckoutFacadeService){
    this.checkIfGuest();
  }

  ngOnInit() {
    // Attendez un court délai avant de vérifier le guest
  }

  checkIfGuest(){
    setTimeout(() => {
    const guest = this.checkoutFacade.getGuest();
    if (!guest || !guest.id) {
      this.router.navigate(['/checkout/guest']).then(() => {
        console.log('Redirection effectuée vers la page Guest');
      });
    } }, 100);
  }

}
