import { Component } from '@angular/core';
import { Observable, filter, skipWhile, take } from 'rxjs';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { CartFacadeService } from '../../cart/cart-facade.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutFacadeService } from '../checkout-facade.service';
import { Guest } from 'src/app/core/interfaces/Guest';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent {
  
  cart$ !: Observable<Configuration[]>;
  cart !: Configuration[];

  form !: FormGroup;
  submitted : boolean = false;

  constructor(private checkoutFacade : CheckoutFacadeService, 
              private formBuilder: FormBuilder,
              private router : Router){    
  }

  ngOnInit(){
    const guest = this.checkoutFacade.getGuest();
    this.form = this.formBuilder.group({
      firstName: [guest ? guest.first_name : '', Validators.required],
      lastName: [guest ? guest.last_name : '', Validators.required],
      email: [guest ? guest.email : '', [Validators.required, Validators.email]],
      numberPhone: [guest ? guest.number_phone : '', [Validators.required, Validators.pattern('[0-9]*')]],
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

      const guest:Guest = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        number_phone: numberPhoneValue
      }


      this.checkoutFacade.setLoading(true);
      console.log("je lance le loader")

      this.checkoutFacade.setGuest(guest);
      this.checkoutFacade.createGuestAndConfigurationAndCart();

      this.checkoutFacade.loadingSubject$.pipe(
        filter(loading => !loading),
         take(1)).subscribe( () => this.redirectToNextStep())

    } else {
      // Le formulaire est invalide, affichez un message d'erreur ou prenez des mesures
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }

  redirectToNextStep(){
    const needPrescription = this.checkoutFacade.checkIfPrescriptionNeeded();

    if(needPrescription){
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
