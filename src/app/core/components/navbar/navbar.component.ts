import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartFacadeService } from 'src/app/public/cart/cart-facade.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() hidden !: boolean;
  @Output() btnClick = new EventEmitter();
  cartItemsCount: number = 0;

  constructor(private cartFacade : CartFacadeService){
    this.cartFacade.cartItems$.subscribe(cartItems => {
      this.cartItemsCount = cartItems.length;
    });
  }

  onClick(){
    this.btnClick.emit();
  }


}
