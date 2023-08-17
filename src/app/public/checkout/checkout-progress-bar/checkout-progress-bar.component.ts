import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckoutFacadeService } from '../checkout-facade.service';

@Component({
  selector: 'app-checkout-progress-bar',
  templateUrl: './checkout-progress-bar.component.html',
  styleUrls: ['./checkout-progress-bar.component.css']
})
export class CheckoutProgressBarComponent {

  needPrescription: boolean;
  steps: any[] = [];

  constructor(private checkoutFacade: CheckoutFacadeService, private router: Router) {
    this.needPrescription = this.checkoutFacade.checkIfPrescriptionNeeded();
  }
 ngOnInit(){
    this.steps = this.needPrescription
      ? [
          { label: 'Details', route: '/checkout/guest' },
          { label: 'Prescription', route: '/checkout/prescription' },
          { label: 'Address', route: '/checkout/address'},
          { label: 'Payment', route: '/checkout/payment' }
        ]
      : [
          { label: 'Details', route: '/checkout/guest' },
          { label: 'Address', route: '/checkout/address' },
          { label: 'Payment', route: '/checkout/payment' }
        ];
 }

  isRouteActive(routePaths: string[]): boolean {
    return routePaths.some(routePath => this.router.isActive(routePath, false));
  }
}
