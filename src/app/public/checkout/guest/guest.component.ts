import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { CartFacadeService } from '../../cart/cart-facade.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutFacadeService } from '../checkout-facade.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent {
  
  cart$ !: Observable<Configuration[]>;
  cart !: Configuration[];

  form: FormGroup;
  submitted : boolean = false;

  constructor(private checkoutFacade : CheckoutFacadeService, 
              private formBuilder: FormBuilder){


    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberPhone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });

  }

  get firstNameControl() {
    return this.form.get('firstName');
  }

  get lastNameControl() {
    return this.form.get('lastName');
  }
  
  get emailControl() {
    return this.form.get('email');
  }
  
  get numberPhoneControl() {
    return this.form.get('numberPhone');
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // Le formulaire est valide, vous pouvez soumettre les données
      console.log('Formulaire valide. Soumission des données...');

      const firstNameValue = this.form.get('firstName')?.value;
      const lastNameValue = this.form.get('lastName')?.value;
      const emailValue = this.form.get('email')?.value;
      const numberPhoneValue = this.form.get('numberPhone')?.value;

      this.checkoutFacade.createGuestAndConfigurationAndCart(firstNameValue, lastNameValue, emailValue, numberPhoneValue);
      
    } else {
      // Le formulaire est invalide, affichez un message d'erreur ou prenez des mesures
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }
}
