import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title !: string;
  @Input() text !: string;
  @Input() error !: boolean;
  @Input() isModalVisible !: boolean;
  @Output() btnClick = new EventEmitter();

  close(){
    this.isModalVisible = false;
    this.btnClick.emit();
  }

}
