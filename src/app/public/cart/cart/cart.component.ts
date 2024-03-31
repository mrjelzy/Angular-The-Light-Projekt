import { Component } from '@angular/core';
import { CartFacadeService } from '../cart-facade.service';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { Observable, Subscription, combineLatest, first, map, take } from 'rxjs';
import { Link } from 'src/app/core/interfaces/Link';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Delivery } from 'src/app/core/interfaces/Delivery';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart$: Observable<Configuration[]>;
  total$: Observable<number>;
  delivery$ : Observable<Delivery | null>
  links !: Link[];
  pageInfo: any;

  title = "Le Panier | The Light Projekt"

  constructor(private cartFacade : CartFacadeService, private router : Router,
    private seoService : SeoService ){
    this.cart$ = this.cartFacade.cartItems$;
    this.total$ = this.cartFacade.totalPrice$;
    this.delivery$ = this.cartFacade.delivery$;
    this.cartFacade.pageInfo$.pipe(first()).subscribe(pageInfo => this.pageInfo = pageInfo);
  }

  ngOnInit(){
    this.cartFacade.links$.pipe(first()).subscribe(links => this.links = links);
    this.seoService.updateTitle(this.title);
    this.seoService.addRobotsMeta(true, true);
  }

  closeClick(id: string){
  //  console.log("je supprime un objet", id)
   this.cartFacade.removeFromCartById(id);
  }

  nextClick(){
    this.router.navigate(['/checkout']);
  }





}
