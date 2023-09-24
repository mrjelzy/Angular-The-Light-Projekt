import { Component } from '@angular/core';
import { CartFacadeService } from '../cart-facade.service';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { Observable, Subscription, first, take } from 'rxjs';
import { Link } from 'src/app/core/interfaces/Link';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart$: Observable<Configuration[]>;
  total$: Observable<number>;

  links !: Link[];
  pageInfo: any;

  title = "The Light Projekt | Le Panier"

  constructor(private cartFacade : CartFacadeService, private router : Router,
    private titleService: Title,  
    private metaTagService: Meta ){
    this.cart$ = this.cartFacade.cartItems$;
    this.total$ = this.cartFacade.totalPrice$;
    this.cartFacade.pageInfo$.pipe(first()).subscribe(pageInfo => this.pageInfo = pageInfo);
  }

  ngOnInit(){
    this.cartFacade.links$.pipe(first()).subscribe(links => this.links = links);
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({name:'robots', content: 'noindex, nofollow'})
  }

  closeClick(id: string){
   console.log("je supprime un objet", id)
   this.cartFacade.removeFromCartById(id);
  }

  nextClick(){
    this.router.navigate(['/checkout']).then(() => {
      console.log('Redirection effectuée vers la page de checkout');
    });
  }





}
