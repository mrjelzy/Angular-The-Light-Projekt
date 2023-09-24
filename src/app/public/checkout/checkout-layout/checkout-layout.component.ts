import { Component, Renderer2 } from '@angular/core';
import { CheckoutFacadeService } from '../checkout-facade.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

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

  title = "The Light Projekt | Checkout"

  constructor(private checkoutFacade : CheckoutFacadeService, private titleService: Title,  
    private metaTagService: Meta ){
    this.loading$ = this.checkoutFacade.loadingSubject$;
  }

  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({name:'robots', content: 'noindex, nofollow'})
  }

}
