import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from 'src/app/core/interfaces/Link';
import { WebContentService } from 'src/app/core/services/web-content.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() hidden !: boolean;
  @Output() btnClick = new EventEmitter();

  menuLinks !: Link[];
  
  constructor(private webContentService : WebContentService){}

  ngOnInit(){
    this.webContentService.getMenuLinks().subscribe((response) =>
    {
      this.menuLinks = response.data;
    });
  }

  onClick(){
    this.btnClick.emit();
  }
}
