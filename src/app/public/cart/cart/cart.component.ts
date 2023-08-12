import { Component } from '@angular/core';
import { CartFacadeService } from '../cart-facade.service';
import { Configuration } from 'src/app/core/interfaces/Configuration';
import { Observable, Subscription, first, take } from 'rxjs';
import { Link } from 'src/app/core/interfaces/Link';

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


  constructor(private cartFacade : CartFacadeService){
    this.cart$ = this.cartFacade.cartItems$;
    this.total$ = this.cartFacade.totalPrice$;
    this.cartFacade.pageInfo$.pipe(first()).subscribe(pageInfo => this.pageInfo = pageInfo);
  }

  ngOnInit(){
    this.cartFacade.links$.pipe(first()).subscribe(links => this.links = links);
  }

  closeClick(id: string){
   console.log("je supprime un objet", id)
   this.cartFacade.removeFromCartById(id);
  }

}
