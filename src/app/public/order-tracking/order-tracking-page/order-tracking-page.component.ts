import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderTrackingFacadeService } from '../order-tracking-facade.service';
import { OrderResponse } from 'src/app/core/interfaces/OrderResponse';
import { first } from 'rxjs';

@Component({
  selector: 'app-order-tracking-page',
  templateUrl: './order-tracking-page.component.html',
  styleUrls: ['./order-tracking-page.component.css']
})
export class OrderTrackingPageComponent {

  form !: FormGroup;
  submitted : boolean = false;

  data !: OrderResponse | null;
  error : any | null = null;

  constructor(private formBuilder: FormBuilder, private orderTrackingFacade : OrderTrackingFacadeService,
              private router : Router){}

  ngOnInit(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      orderNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  get emailControl() {
    return this.form.get('email');
  }
  
  get orderNumberControl() {
    return this.form.get('orderNumber');
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // Le formulaire est valide, vous pouvez soumettre les données
      console.log('Formulaire valide. Soumission des données...');

      const emailValue = this.form.get('email')?.value;
      const orderNumberValue = this.form.get('orderNumber')?.value;

      this.orderTrackingFacade.loadData(emailValue, orderNumberValue);
      this.orderTrackingFacade.data$.pipe(first()).subscribe(data => {
        this.data = data
        if(this.data == undefined){
          this.error = "Les informations rentrées ne correspondent à aucune commande."
        }else{
          this.redirectToNextStep();
        }
      });

    } else {
      // Le formulaire est invalide, affichez un message d'erreur ou prenez des mesures
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }

  redirectToNextStep(){
    this.router.navigate(['/order-tracking/detail']).then(() => {
      console.log('Redirection effectuée pour obtenir les prescriptions');
    });
  }


  closeModal(){
    this.error = null;
  }
}
