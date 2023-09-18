import { Component, Input } from '@angular/core';
import { Attribute } from 'src/app/core/interfaces/Attribute';
import { Option } from 'src/app/core/interfaces/Option';

@Component({
  selector: 'app-order-item-options',
  templateUrl: './order-item-options.component.html',
  styleUrls: ['./order-item-options.component.css']
})
export class OrderItemOptionsComponent {

  @Input() option !: Option;
  @Input() attribute !: Attribute;


}
