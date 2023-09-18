import { Component, Input } from '@angular/core';
import { Configuration } from 'src/app/core/interfaces/Configuration';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent {
  @Input() cartItem !: Configuration;

  getPrice(){
    let price = this.cartItem.product.price;
    if(this.cartItem.options)
      for(const option of this.cartItem.options)
        price += option.price;
    return price;
  }
}
