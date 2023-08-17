import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-blue-button',
  templateUrl: './blue-button.component.html',
  styleUrls: ['./blue-button.component.css']
})
export class BlueButtonComponent {
  @Input() label !: string;
  @Input() class !: string;
  @Input() disabled: boolean = false;
}
