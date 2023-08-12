import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  hidden: boolean = true;

  hiddenChange(){
    this.hidden = !this.hidden;
  }
}
