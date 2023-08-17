import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutFacadeService } from '../checkout-facade.service';
import { Address } from 'src/app/core/interfaces/Address';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private checkoutFacade: CheckoutFacadeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  get addressControl() {
    return this.form.get('address');
  }

  get cityControl() {
    return this.form.get('city');
  }

  get postalCodeControl() {
    return this.form.get('postalCode');
  }

  get countryControl() {
    return this.form.get('country');
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // Save the address information or perform any necessary action here
      // For example, you can use the CheckoutFacadeService to update the address data
      console.log('Formulaire valide. Soumission des données...');

      const addressInput = this.form.get('address')?.value;
      const cityInput = this.form.get('city')?.value;
      const postalCodeInput = this.form.get('postalCode')?.value;
      const countryInput = this.form.get('country')?.value;

        const address:Address = {
          address: addressInput,
          postal_code: postalCodeInput,
          city: cityInput,
          country: countryInput
        }

      this.checkoutFacade.setLoading(true);

      this.checkoutFacade.createAddress(address);

      this.checkoutFacade.loadingSubject$.pipe(
        filter(loading => !loading),
         take(1)).subscribe( () => this.redirectToNextStep())
    }
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

  redirectToNextStep(){
    this.router.navigate(['/checkout/payment']).then(() => {
      console.log('Redirection effectuée pour obtenir les prescriptions');
    });
  }
}
