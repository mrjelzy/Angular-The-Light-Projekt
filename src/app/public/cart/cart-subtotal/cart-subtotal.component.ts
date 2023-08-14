import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-subtotal',
  templateUrl: './cart-subtotal.component.html',
  styleUrls: ['./cart-subtotal.component.css']
})
export class CartSubtotalComponent {
  @Input() total !: number;
  @Input() summary!: string;
  @Input() subtotal!: string;
  @Input() shipping!: string;
  @Input() free_shipping!: string;
  @Input() totalText!: string;
  @Input() next!: string;
  @Output() btnClick = new EventEmitter();

  onClick(){
    this.btnClick.emit();
  }
  
}
