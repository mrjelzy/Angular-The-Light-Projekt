import { Component } from '@angular/core';
import { CheckoutFacadeService } from '../checkout-facade.service';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { Observable, filter, map, skipWhile, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent {
  cart$: Observable<Configuration[]>;

  selectedFiles$: Observable<{ [itemId: number]: File | null }>;
  itemFileSelections$: Observable<{ [itemId: number]: boolean }>;
  itemSendPrescriptionLater$: Observable<{ [itemId: number]: boolean }>;

  itemsWithFiles$: Observable<number[]>;
  itemsWithLaterOption$: Observable<number[]>;

  error : any | null = null;

  constructor(private checkoutFacade : CheckoutFacadeService, private router : Router){
    this.cart$ = this.checkoutFacade.configurations$;
    this.selectedFiles$ = this.checkoutFacade.selectedFiles$;
    this.itemFileSelections$ = this.checkoutFacade.itemFileSelections$;
    this.itemSendPrescriptionLater$ = this.checkoutFacade.itemSendPrescriptionLater$;
    this.itemsWithFiles$ = this.checkoutFacade.getItemsWithFiles();
    this.itemsWithLaterOption$ = this.checkoutFacade.getItemsWithLaterOption();
  }

  ngOnInit(){
    this.checkoutFacade.errorSubject$.subscribe(error => {
      if(error)
        this.error = error;
    });

    this.checkIfGuest();
  }

  handleOptionChange(event: any, option: 'file' | 'later', itemId: number): void {
    this.checkoutFacade.handleOptionChange(event, option, itemId);
  }

  canContinue(): Observable<boolean> {
    return this.checkoutFacade.canContinue();
  }

  handleContinueClick(): void {
    this.checkoutFacade.setLoading(true);

    this.checkoutFacade.handleContinueClick();

    this.checkoutFacade.loadingSubject$.pipe(
      filter(loading => !loading),
      take(1)).subscribe( () => {
        if(this.error === null)
          this.redirectToNextStep()
      }

    )
  }

  redirectToNextStep() {
      this.router.navigate(['/checkout/address']);
  }

  closeModal(){
    this.error = null;
    this.checkoutFacade.setErrorToNull();
  }

  checkIfGuest(){
    const guest = this.checkoutFacade.getGuest();
    if (!guest || !guest.id) {
      this.router.navigate(['/checkout/guest']);
    }
  }
  
}
