import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Configuration } from 'src/app/core/interfaces/Configuration';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() cartItem !: Configuration;
  @Output() btnClick = new EventEmitter<string>();

  getPrice(){
    let price = this.cartItem.product.price;
    if(this.cartItem.options)
      for(const option of this.cartItem.options)
        price += option.price;
    return price;
  }

  closeClick(){
    this.btnClick.emit(this.cartItem.id);
  }

}
