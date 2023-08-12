import { Component, Input } from '@angular/core';
import { Option } from 'src/app/core/interfaces/Option';
import { Attribute } from 'src/app/core/interfaces/Attribute';

@Component({
  selector: 'app-cart-item-options',
  templateUrl: './cart-item-options.component.html',
  styleUrls: ['./cart-item-options.component.css']
})
export class CartItemOptionsComponent {
  @Input() option !: Option;
  @Input() attribute !: Attribute;

}
