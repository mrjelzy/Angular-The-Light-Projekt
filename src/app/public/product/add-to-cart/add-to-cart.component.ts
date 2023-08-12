import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent {
  @Output() btnClick = new EventEmitter();
  @Input() title !: string;

  onClick(){
    this.btnClick.emit();
  }


}
