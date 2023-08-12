import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/interfaces/Product';
import { WebContentService } from 'src/app/core/services/web-content.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product !: Product;
  
}
